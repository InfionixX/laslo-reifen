<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->name) && !empty($data->email) && !empty($data->message) && !empty($data->phone)) {
        // Server-side plausibility check – the client rules are only a convenience.
        if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["message" => "Invalid email address"]);
            exit;
        }

        $to = "laszlo@magyar-gumis.de";
        // Strip CR/LF from anything that ends up in a header (injection guard).
        $safeSubject = str_replace(array("\r", "\n"), " ", (string) ($data->subject ?? ""));
        $safeEmail = str_replace(array("\r", "\n"), "", (string) $data->email);

        $subject = "Neue Anfrage: " . $safeSubject;
        $body = "Name: " . $data->name . "\n";
        $body .= "Email: " . $data->email . "\n";
        $body .= "Telefon: " . ($data->dialCode ?? "") . " " . $data->phone . "\n";
        if (!empty($data->hsn) || !empty($data->tsn)) {
            $body .= "HSN (2.1): " . ($data->hsn ?? "") . "\n";
            $body .= "TSN (2.2): " . ($data->tsn ?? "") . "\n";
        }
        $body .= "\nNachricht:\n" . $data->message;
        $headers = "From: " . $safeEmail;

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
