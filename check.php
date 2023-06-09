<?php
$login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING);
$name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
$pass = filter_var(trim($_POST['pass']), FILTER_SANITIZE_STRING);

if(mb_strlen($login) < 5 || mb_strlen($login) > 90){
    echo "Not suitable length for login.";
    exit();
} else if(mb_strlen($name) < 3 || mb_strlen($login) > 50){
    echo "Not suitable length for name.";
    exit();
} else if(mb_strlen($pass) < 2 || mb_strlen($pass) > 10) {
    echo "Not suitable length for name. From 2 to 6 symbols.";
    exit();
}
$pass = md5($pass."fmiwrss7894");

$mysql = new mysqli('localhost', 'root', '', 'monumets');
$mysql->query("INSERT INTO `users` (`login`, `pass`, `name`) VALUES ('$login','$pass','$name')");

$mysql->close();

header('Location: login.php');
?>
