<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$host = "localhost";
$dbuser = "root";
$pass = "";
$dbname = "expensedb";

$connection = new mysqli($host, $dbuser, $pass, $dbname);

if ($connection->connect_error) {
	die("Error happened");
}

$transaction_id = @$_POST['transaction_id'];
$users_id = $_POST['id'];
$amount = $_POST['amount'];
$title = $_POST['title'];
$date = $_POST['date'];
$earned = $_POST['earned'];

// Prepare the SQL statement with corrected column names
$query = $connection->prepare("INSERT INTO `transactions` (`transaction_id`, `user_id`, `amount`, `title`, `date`, `earned`) 
VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `amount` = VALUES(`amount`), `title` = VALUES(`title`), `date` = VALUES(`date`), `earned` = VALUES(`earned`)");

// Bind the parameters with the corrected types
$query->bind_param('iiissi', $transaction_id, $users_id, $amount, $title, $date, $earned);

if ($query->execute()) {
	echo json_encode(['message' => 'Data inserted/updated successfully']);
} else {
	echo json_encode(['error' => $query->error]);
}

// Close the statement and connection
$query->close();
$connection->close();
?>