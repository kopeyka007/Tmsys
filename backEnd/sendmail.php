<?php
    require '../assets/PHPMailer/PHPMailerAutoload.php';
    require '../assets/PHPMailer/class.phpmailer.php';
   
    var_dump(file_get_contents("php://input"));


    function sendMail($template)
    {
        $to  = 
        $file = "";

        $mail = new PHPMailer;
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();                                     
        $mail->Host = 'smtp.mailtrap.io';                    
        $mail->SMTPAuth = true;                               
        $mail->Username = '32eae76014a6e3';                
        $mail->Password = '3421088eac2e73';                        
        $mail->SMTPSecure = 'tls';                          
        $mail->Port = 465;

        if (file_exists($template))
        {
            ob_start();
            include $template;
            $file = ob_get_contents();
            ob_end_clean();
            $mail->Body  = $file;
        }
        else
        {
            $mail->Body  = $template;
        }

        $mail->setFrom('agent@book247.net', 'Book247 Listening Agent');
        $mail->addAddress($data["to"], $data["full_name"]);

        $mail->isHTML(true); 
        $mail->Subject = $subject;

        $mail->send();
    }
