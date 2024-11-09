<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$host = "localhost";
$dbuser = "root";
$pass = "";
$dbname = "expensedb";

$connection = new mysqli($host, $dbuser, $pass, $dbname);

if ($connection->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $connection->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = $connection->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $query->bind_param('ss', $username, $hashedPassword);

    if ($query->execute()) {
        $userId = $connection->insert_id;
        echo json_encode(["id" => $userId]);
    } else {
        echo json_encode(["error" => "Registration failed"]);
    }
} else {
    echo json_encode(["error" => "Username or password not provided"]);
}
