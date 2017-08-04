<?php
    require '../assets/PHPMailer/PHPMailerAutoload.php';
    require '../assets/PHPMailer/class.phpmailer.php';
   
    $contents = json_decode(file_get_contents("php://input"));
    var_dump($contents);
    foreach ($contents as $content => $value) {
        echo $value;
    };


    $mail = new PHPMailer;
    $mail->CharSet = 'UTF-8';
    
    $mail->isSMTP();
    $mail->Host = 'smtp.mailtrap.io';
    $mail->SMTPAuth = true;
    $mail->Username = '32eae76014a6e3';
    $mail->Password = '3421088eac2e73';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 465;

    $mail->setFrom('TMsys@div.com', 'TMsys');
    //$mail->addAddress($content[6], 'Terrasy');
    $mail->isHTML(true);

    $mail->Subject = 'Terrasy';
    $mail->Body    =  $content[6];
    $mail->send();

