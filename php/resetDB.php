<?php

$path = 'inc/roster_init.json';
$jsonString = file_get_contents($path);
$jsonData = json_decode($jsonString, true);

$record =  array_values($jsonData["data"]);
//49 records, for keeping track of appending commas later
$numItems = count($record);
$commaPolice = 1;
$commaStatus = true;
$sqlValueList = "";
//similar, but this removes the comma from the last argument withing each value-list
$countToFour = 1;


foreach($record as $key => $value) { 

    $sqlValueList .= "(";

    if ($commaPolice==49) {
        $commaStatus = false;
    } else {
    $commaPolice++;
        }

    foreach($value as $type => $val) {
        //this is done to avoid appending a trailing comma at the very end of the value list, within the
        //sql insert query as it gets built (values appended) on each pass of the foreach loop.

        if ($countToFour==4){
            $sqlValueList .="'";
            $sqlValueList .=$val;
            $sqlValueList .="'";
        } else {
            $countToFour++;
            $sqlValueList .="'";
            $sqlValueList .=$val;
            $sqlValueList .="',";
        }
    }
    $countToFour = 1;
    if ($commaStatus){
        $sqlValueList .= "),";
    } else {
        $sqlValueList .= ")";
    }
    
} 

echo "Final sql value list is: ".$sqlValueList;
$sqlQuery01 = "DELETE FROM artist_roster";
$sqlQuery02 = "INSERT INTO artist_roster (artist, rate, streams, overdue)
VALUES $sqlValueList";


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

if ($conn->query($sqlQuery01) === TRUE) {
    echo "backup file roster_init successfully restored to the database";
  } else {
    echo "Error: " . $sqlQuery01 . "<br>" . $conn->error;
  }

if ($conn->query($sqlQuery02) === TRUE) {
    echo "backup file roster_init successfully restored to the database";
  } else {
    echo "Error: " . $sqlQuery02 . "<br>" . $conn->error;
  }
  
  $conn->close();
?>