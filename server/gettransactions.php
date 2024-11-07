<?php

$host = "localhost";
$dbuser = "root";
$pass = "";
$dbname = "expensedb";

$connection = new mysqli($host, $dbuser, $pass, $dbname);
if ($connection->connect_error) {
	die("Error happened");
}

$users_id = $_POST['users_id'];
$query = $connection->prepare("SELECT * FROM `transactions`");

$query->execute();

$result = $query->get_result();

if ($result->num_rows > 0) {
	$array = [];
	while ($row = $result->fetch_assoc()) {
		if ($row['users_id'] == $users_id) {
			$array[] = $row;
		}
	}
	echo json_encode($array);
} else {
	echo json_encode(['error' => $query->error]);
}
