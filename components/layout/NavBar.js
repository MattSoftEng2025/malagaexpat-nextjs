<?php
/**
 * consultation.php — Backend endpoint for the Consultation popup
 * JSON in:  { name, email, phone?, service?, preferredTime?, message, company? (honeypot) }
 * JSON out: { ok: true } on success
 *
 * Mail transport: AWS SES via SMTP (PHPMailer)
 */

// ================== CONFIG ==================
$allowed_origins = [
  'https://malagaexpat.com',
  'https://www.malagaexpat.com',
  'http://localhost:3000', // dev
];

$block_links = true; // simple anti-spam: reject messages containing raw URLs

// Read required env vars (DO NOT hardcode secrets)
$SMTP_HOST  = getenv('SMTP_HOST');   // e.g. email-smtp.eu-west-1.amazonaws.com
$SMTP_USER  = getenv('SMTP_USER');
$SMTP_PASS  = getenv('SMTP_PASS');
$FROM_EMAIL = getenv('FROM_EMAIL');  // e.g. 'Malaga Expat <enquiries@malagaexpat.com>'
$TO_EMAIL   = getenv('TO_EMAIL_CONSULTATION') ?: getenv('TO_EMAIL') ?: $FROM_EMAIL;

// ============== CORS / PREFLIGHT =============
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: $origin");
} else {
  // Fallback to your primary domain (optional)
  header("Access-Control-Allow-Origin: https://malagaexpat.com");
}
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// ============== METHOD GUARD =================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

// ============== INPUT (JSON) =================
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

// ============== HONEYPOT =====================
if (!empty($data['company'])) {
  echo json_encode(['ok' => true]); // silently succeed for bots
  exit;
}

// ============== VALIDATION ===================
$required = ['name', 'email', 'message'];
$errors = [];

foreach ($required as $f) {
  if (!isset($data[$f]) || !is_string($data[$f]) || trim($data[$f]) === '') {
    $errors[$f] = 'Required';
  }
}
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = 'Invalid email';
}
if ($block_links && !empty($data['message']) && preg_match('/\bhttps?:\/\/\S+/i', $data['message'])) {
  $errors['message'] = 'Links are not allowed in the message.';
}

if ($errors) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'errors' => $errors]);
  exit;
}

// ============== SANITIZE =====================
$name          = trim($data['name']);
$email         = trim($data['email']);
$phone         = isset($data['phone']) ? trim((string)$data['phone']) : '';
$service       = isset($data['service']) ? trim((string)$data['service']) : '';
$preferredTime = isset($data['preferredTime']) ? trim((string)$data['preferredTime']) : '';
$message       = trim($data['message']);

// ============== MAIL CONTENT =================
$subject = '[Consultation Request] ' . ($service ? "$service from $name" : "from $name");

$lines = [
  "Name: $name",
  "Email: $email",
  "Phone: $phone",
  "Service/Topic: $service",
  "Preferred time-slot: $preferredTime",
  "",
  "Message:",
  $message
];
$textBody = implode("\n", $lines);

function esc($s) { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

$htmlBody = '<h2>New consultation</h2>'
  . '<p><strong>Name:</strong> ' . esc($name) . '</p>'
  . '<p><strong>Email:</strong> ' . esc($email) . '</p>'
  . ($phone ? '<p><strong>Phone:</strong> ' . esc($phone) . '</p>' : '')
  . ($service ? '<p><strong>Service/Topic:</strong> ' . esc($service) . '</p>' : '')
  . ($preferredTime ? '<p><strong>Preferred time-slot:</strong> ' . esc($preferredTime) . '</p>' : '')
  . '<hr><pre style="white-space:pre-wrap">' . esc($message) . '</pre>';

// ============== ENV CHECKS ===================
if (!$SMTP_HOST || !$SMTP_USER || !$SMTP_PASS || !$FROM_EMAIL || !$TO_EMAIL) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'SMTP/Email environment variables are not set']);
  exit;
}

// ============== AUTOLOAD PHPMailer ===========
$autoloadResolved = false;
$paths = [
  __DIR__ . '/vendor/autoload.php',
  __DIR__ . '/../vendor/autoload.php',
];
foreach ($paths as $p) {
  if (is_file($p)) { require $p; $autoloadResolved = true; break; }
}
if (!$autoloadResolved) {
  error_log('consultation.php: Composer autoload not found');
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Server mailer not installed (autoload missing)']);
  exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Helper: split "Name <email@x>" into parts for PHPMailer
function parseFromAddress($fromRaw) {
  $name = null; $addr = trim($fromRaw);
  if (preg_match('/^(.*)<(.+?)>$/', $fromRaw, $m)) {
    $name = trim($m[1], "\"' \t");
    $addr = trim($m[2]);
  }
  return [$addr, $name];
}

try {
  // ============== PHPMailer (SES SMTP) ==========
  [$fromAddr, $fromName] = parseFromAddress($FROM_EMAIL);

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';

  $mail->isSMTP();
  $mail->Host       = $SMTP_HOST;
  $mail->Port       = 587; // STARTTLS
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->SMTPAuth   = true;
  $mail->Username   = $SMTP_USER;
  $mail->Password   = $SMTP_PASS;

  // From / To / Reply-To
  if ($fromName) $mail->setFrom($fromAddr, $fromName);
  else           $mail->setFrom($fromAddr);
  $mail->addAddress($TO_EMAIL);
  $mail->addReplyTo($email, $name);

  // Content
  $mail->Subject = $subject;
  $mail->isHTML(true);
  $mail->Body    = $htmlBody;
  $mail->AltBody = $textBody;

  $mail->send();

  echo json_encode(['ok' => true]);
} catch (Exception $e) {
  // Log real reason server-side, return generic error client-side
  error_log('PHPMailer error (consultation.php): ' . $e->getMessage());
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to send email']);
}
