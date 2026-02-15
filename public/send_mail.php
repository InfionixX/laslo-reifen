<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->name) && !empty($data->email) && !empty($data->message)) {
        $to = "info@laslo-reifen.de"; // Replace with actual email
        $subject = "Neue Anfrage: " . $data->subject;
        $body = "Name: " . $data->name . "\n";
        $body .= "Email: " . $data->email . "\n\n";
        $body .= "Nachricht:\n" . $data->message;
        $headers = "From: " . $data->email;

        if (mail($to, $subject, $body, $headers)) {
            http_response_code(200);
            echo json_encode(["message" => "Email sent successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to send email"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Incomplete data"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>
