<?php
$servername='localhost';
$username='root';
$password='';
$dbname = "monumets";
$conn=mysqli_connect($servername,$username,$password,"$dbname");
if(!$conn){
    die('Could not Connect MySql Server:' .mysql_error());
}

$sql = "SELECT bug,opinion FROM `opinion_on`,`bugreport`";
$result = $conn->query($sql);

if ($result-> num_rows>0){
    while($row = $result->fetch_assoc()){
        echo "<tr><td>".$row["bug"]."</td><td>".$row["opinion"]."</td></tr>";
    }
    echo "</table>";
} else{
    echo "0 result";
}
$conn-> close();

