<?php
require_once("site.conf");
/*Mail*/

$to = MAIL_TO;
$subject = '[%COMPANY_NAME%] Вам написал товарищ '.$_REQUEST['name'];
$message =
    'Имя: '.$_REQUEST['name'].'<br><br>'.
    'Телефон: <a href="tel:'.$_REQUEST['phone'].'">'.$_REQUEST['phone'].'</a><br><br>'.
    'E-mail: <a href="mailto:'.$_REQUEST['email'].'">'.$_REQUEST['email'].'</a><br><br>'.
    'Комментарий: '.$_REQUEST['text'].'<br><br>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: '.$_REQUEST['phone'].  "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

if ($_REQUEST['name']) {
	mail($to, $subject, $message, $headers);
}