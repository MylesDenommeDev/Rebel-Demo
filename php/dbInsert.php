<?php

$db_payload = explode(".", $argv[1]);

$dbServerName = "sql9.freemysqlhosting.net";
$dbUsername = "sql9599342";
$dbPassword = "IPQQUZdtfw";
$dbName = "sql9599342";

// create connection
$conn = new mysqli($dbServerName, $dbUsername, $dbPassword, $dbName);
// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$artistNameArray = explode("_", $db_payload[0]);
$artistName = implode("_", $artistNameArray);

$rateAsFloat = '0.';
$rateAsFloat.=$db_payload[1];


$sql = "INSERT INTO artist_roster (artist, rate, streams, overdue)
VALUES ('$artistName', '$rateAsFloat', '$db_payload[2]', '$db_payload[3]')";
if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();



?>