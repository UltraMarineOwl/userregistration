<?php
$servername='localhost';
$username='root';
$password='';
$dbname = "monumets";
$conn=mysqli_connect($servername,$username,$password,"$dbname");
if(!$conn){
    die('Could not Connect MySql Server:' .mysql_error());
}


$opinion = $_POST['opinion'];
$sql = "INSERT INTO `opinion_on` (`opinion`) VALUES ('$opinion')";
if (mysqli_query($conn, $sql)) {
    echo "New record has been added successfully !";
} else {
    echo "Error: " . $sql . ":-" . mysqli_error($conn);
}
mysqli_close($conn);


header('Location: login.php');
