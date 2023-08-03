<?php

// use
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// PHPMailer 라이브러리 파일을 불러옵니다.
require_once './PHPMailer/src/PHPMailer.php';
require_once './PHPMailer/src/SMTP.php';
require_once './PHPMailer/src/Exception.php';

echo "require complete";

// PHPMailer 객체를 생성합니다.
$mail = new PHPMailer;

// SMTP를 사용하여 메일을 보낼 것임을 지정합니다.
$mail->isSMTP();

$mail->SMTPDebug = 2;

// SMTP 서버를 지정합니다.
$mail->Host = 'smtp.samyangfoods.com';

// SMTP 인증을 사용한다는 것을 지정합니다.
$mail->SMTPAuth = true;

// SMTP 계정 정보를 입력합니다.
$mail->Username = 'tangle@samyangfoods.com';
$mail->Password = 'tangle2304~'; 

// SMTP 보안을 사용한다는 것을 지정합니다. (SSL을 사용할 경우)
// $mail->SMTPSecure = 'ssl';

// SMTP 포트를 지정합니다. (SSL을 사용할 경우 465 포트 사용)
$mail->Port = 433;

// 보내는 사람의 이메일 주소와 이름을 지정합니다.
$mail->setFrom($_POST['email'], $_POST['name']);

// 수신자의 이메일 주소와 이름을 지정합니다.
$mail->addAddress('tangle@samyangfoods.com', 'Tangle');

// 첨부 파일을 지정합니다. (필요한 경우)
// $mail->addAttachment('/path/to/file.pdf');

// 이메일 제목과 본문을 지정합니다.
$mail->Subject = $_POST['subject'];
$mail->Body = $_POST['message'];

echo $mail->ErrorInfo;

// 이메일을 보냅니다.
if(!$mail->send()) {
    echo '이메일을 보내는 데 실패했습니다.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo '이메일을 성공적으로 보냈습니다.';
}

?>