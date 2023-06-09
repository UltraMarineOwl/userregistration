<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "monumets";

$conn = new mysqli($servername,$username,$password,$dbname);

if ($conn->connect_error){
    die("Connection terminated".$conn->connect_error);
}else{
    //echo "connected";
}

?>
