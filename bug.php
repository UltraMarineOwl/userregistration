<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = "monumets";
$conn = mysqli_connect($servername, $username, $password, "$dbname");
if (!$conn) {
    die('Could not Connect MySql Server:' . mysql_error());
}


var_dump($_POST);
$bug = $_POST['bug'];
$sql = "INSERT INTO `bugreport` (`bug`) VALUES ('$bug')";
if (mysqli_query($conn, $sql)) {
    echo "New record has been added successfully !";
} else {
    echo "Error: " . $sql . ":-" . mysqli_error($conn);
}
mysqli_close($conn);


header('Location: login.php');