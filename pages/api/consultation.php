<?php
/**
 * consultation.php — AWS SES SMTP (PHPMailer) backend for your popup
 * Expects JSON POST: { name, email, phone?, service?, preferredTime?, message, company? (honeypot) }
 * Returns JSON: { ok: true } on success
 *
 * Requires PHPMailer (Composer):  composer require phpmailer/phpmailer
 */

// ---------------- CONFIG ----------------
$allowed_origin = 'https://www.malagaexpat.com'; // set to your live origin (no trailing slash)
$block_links    = true;                           // simple anti-spam

// Read env vars from server (do NOT hardcode)
$SMTP_HOST = getenv('SMTP_HOST');
$SMTP_USER = getenv('SMTP_USER');
$SMTP_PASS = getenv('SMTP_PASS');
$FROM_EMAIL = getenv('FROM_EMAIL'); // e.g. "Malaga Expat <enquiries@malagaexpat.com>"
$TO_EMAIL = getenv('TO_EMAIL_CONSULTATION') ?: getenv('TO_EMAIL') ?: $FROM_EMAIL;

// ---------------- CORS / PREFLIGHT ---------------
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: $allowed_origin");
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  http_response_code(204);
  exit;
}
header("Access-Control-Allow-Origin: $allowed_origin");
header('Content-Type: application/json; charset=utf-8');

// --------------- METHOD GUARD --------------------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

// --------------- INPUT ---------------------------
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

// --------------- HONEYPOT ------------------------
if (!empty($data['company'])) {
  echo json_encode(['ok' => true]); // pretend success for bots
  exit;
}

// --------------- VALIDATION ----------------------
$required = ['name','email','message'];
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

// --------------- SANITIZE ------------------------
$name          = trim($data['name']);
$email         = trim($data['email']);
$phone         = isset($data['phone']) ? trim((string)$data['phone']) : '';
$service       = isset($data['service']) ? trim((string)$data['service']) : '';
$preferredTime = isset($data['preferredTime']) ? trim((string)$data['preferredTime']) : '';
$message       = trim($data['message']);

$subject = '[Consultation Request] ' . ($service ? "$service from $name" : "from $name");

// Body (text & html)
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

function esc($s) {
  return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
$htmlBody = '
  <h2>New consultation</h2>
  <p><strong>Name:</strong> '.esc($name).'</p>
  <p><strong>Email:</strong> '.esc($email).'</p>'.
  ($phone ? '<p><strong>Phone:</strong> '.esc($phone).'</p>' : '').
  ($service ? '<p><strong>Service/Topic:</strong> '.esc($service).'</p>' : '').
  ($preferredTime ? '<p><strong>Preferred time-slot:</strong> '.esc($preferredTime).'</p>' : '').
  '<hr><pre style="white-space:pre-wrap">'.esc($message).'</pre>';

// --------------- ENV CHECKS ----------------------
if (!$SMTP_HOST || !$SMTP_USER || !$SMTP_PASS || !$FROM_EMAIL || !$TO_EMAIL) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'SMTP/Email environment variables are not set']);
  exit;
}

// --------------- SEND VIA PHPMailer (SES SMTP) ---
require __DIR__ . '/vendor/autoload.php'; // Composer autoload

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = $SMTP_HOST;     // e.g. email-smtp.eu-west-1.amazonaws.com
  $mail->Port = 587;            // STARTTLS
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->SMTPAuth = true;
  $mail->Username = $SMTP_USER; // SES SMTP user
  $mail->Password = $SMTP_PASS; // SES SMTP password

  $mail->setFrom($FROM_EMAIL);
  $mail->addAddress($TO_EMAIL);
  $mail->addReplyTo($email, $name);

  $mail->Subject = $subject;
  $mail->Body    = $htmlBody;
  $mail->AltBody = $textBody;
  $mail->isHTML(true);

  $mail->send();

  echo json_encode(['ok' => true]);
} catch (Exception $e) {
  // Log the error server-side if you want: error_log($e->getMessage());
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to send email']);
}
