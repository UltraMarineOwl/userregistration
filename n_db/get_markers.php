<?php
$dbHost = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "monumets";

$db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if($db ->connect_error){
    die("Connection failed: " .$db->connect_error);
}

$result = $db->query("SELECT * FROM treasure");
$markers_js = "[";

if ($result->num_rows > 0)
{
    // output data of each row
    while($row = $result->fetch_assoc())
    {
        $markers_js = $markers_js.'{"lat": '.$row["lat"].', "lng": '.$row["lng"].', "description": "'.$row["address"].'", "title": "'.$row["m_name"].'"},';
    }

}
$markers_js = substr($markers_js, 0, -1).']';

$db->close();
?>

<div aaaa='<?php echo str_replace("'"," ",str_replace("\r\n", "", $markers_js));?>' id="markekrjee1lek12l32j"></div>