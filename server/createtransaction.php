<?php
@error_reporting(E_ERROR | E_PARSE);

$host = "localhost";
$dbuser = "root";
$pass = "";
$dbname = "expensedb";

$connection = new mysqli($host, $dbuser, $pass, $dbname);

if ($connection->connect_error) {
	die("Error happened");
}

$transaction_id = @$_POST['transaction_id'];
$users_id = $_POST['users_id'];
$amount = $_POST['amount'];
$title = $_POST['title'];
$date = $_POST['date'];

$query = $connection->prepare("INSERT INTO `transactions` (`transaction_id`, `users_id`, `amount`, `title`, `date`) 
VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `amount` = VALUES(`amount`), `title` = VALUES(`title`), `date` = VALUES(`date`)");

$query->bind_param('iiiss', $transaction_id, $users_id, $amount, $title, $date);

if ($query->execute()) {
	echo json_encode(['message' => 'Data inserted/updated successfully']);
} else {
	echo json_encode("['error' => $query->error]");
}
