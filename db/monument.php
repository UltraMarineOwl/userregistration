<?php

class monument{
    private $id;
    private $m_name;
    private $address;
    private $type;
    private $lat;
    private $lng;
    private $conn;
    private $tableName = "treasure";

    function setId($id){$this->id = $id;}
    function getId(){return $this->id;}
    function setM_name($m_name){$this->m_name = $m_name;}
    function getM_name(){return $this->m_name;}
    function setAddress($address){$this->address = $address;}
    function getAddress(){return $this->address;}
    function setType($type){$this->type = $type;}
    function getType(){return $this->type;}
    function setLat($lat){$this->lat = $lat;}
    function getLat(){return $this->lat;}
    function setLng($lng){$this->lng = $lng;}
    function getLng(){return $this->lng;}

    public function __construct(){
        require_once('db/DbConnect.php');
        $conn = new DbConnect;
        $this->conn = $conn->connect();
    }

    public function getMonumentsBlankLatLng(){
        $sql = "SELECT * FROM $this->tableName WHERE lat IS NULL AND lng IS NULL";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fet;
    }

}
?>
