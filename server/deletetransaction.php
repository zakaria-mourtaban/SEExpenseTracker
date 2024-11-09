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
	die(json_encode(['error' => 'Database connection error']));
}

$transaction_id = $_POST['transaction_id'];

$query = $connection->prepare("DELETE FROM transactions WHERE transaction_id = ?");
$query->bind_param('i', $transaction_id);

if ($query->execute()) {
	echo json_encode(['message' => 'Data deleted successfully']);
} else {
	echo json_encode(['error' => $query->error]);
}

