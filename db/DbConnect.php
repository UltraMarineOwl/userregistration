<?php

class DbConnect{
    private $host = 'localhost';
    private $dbname = 'monumets';
    private $user = 'root';
    private $pass = '';

    public function connect(){
        try{
           // $conn = new PDO('mysql:host='.$this->host.'; dbname = '.$this->dbname, $this->user, $this->pass);
            $conn = new PDO('monumets', 'root','');
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected";

            //$mysql = new mysqli('localhost', 'root', '', 'monumets');

            return $conn;
        } catch (PDOException $e){
            echo 'Database Error: '.$e->getMessage();
        }
    }
}
?>
