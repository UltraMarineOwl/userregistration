<?php
$login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING);
$pass = filter_var(trim($_POST['pass']), FILTER_SANITIZE_STRING);

$pass = md5($pass."fmiwrss7894");

$mysql = new mysqli('localhost', 'root', '', 'monumets');

$result = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login' AND `pass` = '$pass'");

$user = $result->fetch_assoc();


if($user===null or count($user)==0){
    echo "Error, user is not found.";
    exit();
}

setcookie('user', $user['name'], time() + 3600, "/"); //все странички сайта

$mysql->close();

header('Location: login.php');
?>