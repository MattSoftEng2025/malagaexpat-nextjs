<?php
/**
 * consultation.php — Backend endpoint for the Consultation popup
 * Receives JSON: { name, email, phone?, service?, preferredTime?, message, company(honeypot) }
 * Returns JSON: { ok: true } on success
 */

/* -------------------- CONFIG -------------------- */
$allowed_origin = 'https://www.malagaexpat.com'; // <-- your live site origin (no trailing slash)
$send_to        = 'consultations@yourdomain.com'; // <-- destination inbox
$send_from      = 'no-reply@yourdomain.com';      // <-- verified sender (SES or your mail server)
$subject_prefix = '[Consultation Request]';
$allow_links    = false;                          // block messages with raw links (anti-spam)

/* --------------- CORS / PREFLIGHT --------------- */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: $allowed_origin");
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  http_response_code(204);
  exit;
}

header("Access-Control-Allow-Origin: $allowed_origin");
header('Content-Type: application/json; charset=utf-8');

/* ----------------- METHOD GUARD ----------------- */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

/* ------------------- INPUT ---------------------- */
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

/* ----------------- HONEYPOT --------------------- */
/* Bots often fill hidden field "company" — if so, pretend success */
if (!empty($data['company'])) {
  echo json_encode(['ok' => true]);
  exit;
}

/* ----------------- VALIDATION ------------------- */
$required = ['name', 'email', 'message'];
$errors = [];

foreach ($required as $field) {
  if (!isset($data[$field]) || !is_string($data[$field]) || trim($data[$field]) === '') {
    $errors[$field] = 'Required';
  }
}

if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = 'Invalid email';
}

if (!$allow_links && isset($data['message']) && preg_match('/\bhttps?:\/\/\S+/i', $data['message'])) {
  $errors['message'] = 'Links are not allowed in the message.';
}

if (!empty($errors)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'errors' => $errors]);
  exit;
}

/* ----------------- SANITIZE --------------------- */
$name          = trim($data['name']);
$email         = trim($data['email']);
$phone         = isset($data['phone']) ? trim((string)$data['phone']) : '';
$service       = isset($data['service']) ? trim((string)$data['service']) : '';
$preferredTime = isset($data['preferredTime']) ? trim((string)$data['preferredTime']) : '';
$message       = trim($data['message']);

/* ----------------- BUILD EMAIL ------------------ */
$subject = $subject_prefix . ' ' . ($service ? "$service from $name" : "from $name");

$lines = [
  "Name: $name",
  "Email: $email",
  "Phone: $phone",
  "Service/Topic: $service",
  "Preferred time-slot: $preferredTime",
  "",
  "Message:",
  $message,
];

$body = implode("\n", $lines);

$headers = [
  "From: $send_from",
  "Reply-To: $name <$email>",
  "Content-Type: text/plain; charset=UTF-8",
];
$headers_str = implode("\r\n", $headers);

/* ------------------- SEND ----------------------- */
/**
 * Option 1 (default): PHP mail() — requires MTA (sendmail/postfix) or host mail relay.
 * For production on AWS, many use SES SMTP via system MTA or switch to PHPMailer with SMTP.
 */
$ok = @mail($send_to, $subject, $body, $headers_str);

if (!$ok) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to send email']);
  exit;
}

/* ----------------- SUCCESS ---------------------- */
echo json_encode(['ok' => true]);
