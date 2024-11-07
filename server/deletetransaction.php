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

$query = $connection->prepare("DELETE FROM transactions WHERE transaction_id = $transaction_id");

$query->execute();

if ($query->execute()) {
	echo json_encode(['message' => 'Data deleted successfully']);
} else {
	echo json_encode("['error' => $query->error]");
}
