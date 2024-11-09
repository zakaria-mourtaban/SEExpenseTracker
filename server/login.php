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
    die("Connection failed: " . $connection->connect_error);
}

// Read the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Check if username and password are present
if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    // Prepare the query to select the user and password
    $query = $connection->prepare("SELECT id, password FROM users WHERE username = ?");
    $query->bind_param('s', $username);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
        // Verify the provided password with the hashed password
        if (password_verify($password, $row['password'])) {
            echo json_encode(["id" => $row['id']]);
        } else {
            echo json_encode(["error" => "Authentication failed"]);
        }
    } else {
        echo json_encode(["error" => "User not found"]);
    }
} else {
    echo json_encode(["error" => "Missing username or password"]);
}
