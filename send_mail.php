<?php
// send_mail.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://malagaexpat.com');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

function esc($s){ return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

// Read JSON
$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: [];
$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$company = trim($data['company'] ?? '');
$phone   = trim($data['phone']   ?? '');
$content = trim($data['content'] ?? '');

if (!$name || !$email || !$content) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'Missing fields']);
  exit;
}

try {
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host       = getenv('SMTP_HOST');
  $mail->SMTPAuth   = true;
  $mail->Username   = getenv('SMTP_USER');
  $mail->Password   = getenv('SMTP_PASS');
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;

  $from = getenv('FROM_EMAIL') ?: 'enquiries@malagaexpat.com';
  $to   = getenv('TO_EMAIL')   ?: 'yourgmail@gmail.com';

  $mail->setFrom($from, 'Malaga Expat');
  $mail->addAddress($to);
  $mail->addReplyTo($email);

  $mail->Subject = 'New website enquiry from ' . $name;
  $html  = "<h2>New enquiry</h2>";
  $html .= "<p><strong>Name:</strong> ".esc($name)."</p>";
  $html .= "<p><strong>Email:</strong> ".esc($email)."</p>";
  if ($company) $html .= "<p><strong>Company:</strong> ".esc($company)."</p>";
  if ($phone)   $html .= "<p><strong>Phone:</strong> ".esc($phone)."</p>";
  $html .= "<hr><p>".nl2br(esc($content))."</p>";

  $mail->isHTML(true);
  $mail->Body    = $html;
  $mail->AltBody = "New enquiry\nName: $name\nEmail: $email\n"
                 . ($company ? "Company: $company\n" : "")
                 . ($phone ? "Phone: $phone\n" : "")
                 . "\n---\n$content";

  $mail->send();
  echo json_encode(['ok'=>true]);
} catch (\Throwable $e) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>$e->getMessage()]);
}
