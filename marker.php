<?php
$servername='localhost';
$username='root';
$password='';
$dbname = "monumets";
$conn=mysqli_connect($servername,$username,$password,"$dbname");
if(!$conn){
    die('Could not Connect MySql Server:' .mysql_error());
}


$lat = $_POST['lat'];
$lng = $_POST['lng'];
$text = $_POST['text'];
$title = $_POST['title'];
$sql = "INSERT INTO `treasure` (`m_name`,`address`,`lat`,`lng`) VALUES ('$title','$text',$lat,$lng)";
if (mysqli_query($conn, $sql)) {
    echo "New record has been added successfully !";
} else {
    echo "Error: " . $sql . ":-" . mysqli_error($conn);
}
mysqli_close($conn);


header('Location: login.php');
