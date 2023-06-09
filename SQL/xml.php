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

function parseToXML($htmlStr){
    $xmlStr = str_replace('<','&lt;',$htmlStr);
    $xmlStr = str_replace('>','&gt;',$htmlStr);
    $xmlStr = str_replace('<','&quot;',$htmlStr);
    $xmlStr = str_replace('<','&#39;',$htmlStr);
    $xmlStr = str_replace('<','&amp;',$htmlStr);
    return $xmlStr;
}

$query = "SELECT * FROM markers";
$result = mysqli_query($conn, $query);
if (!$result){
    die('Invalid query: '.mysqli_error());
}

header("Content-type: text/xml");

echo "<?xml version ='1.0' ?>";

echo '<markers>';

$ind = 0;

while ($row = @mysqli_fetch_assoc($result)){
    echo '<marker ';
    echo 'id="'.$row['id'].'"';
    echo 'name="'.parseToXML($row['name']).'" ';
    echo 'address= "'.parseToXML($row['address']).'" ';
    echo 'lat="'.$row['lat'].'" ';
    echo 'lng="'.$row['lng'].'" ';
    echo 'type="'.$row['type'].'" ';
    echo '/>';
    $ind = $ind + 1;

}

echo '</markers>';

?>