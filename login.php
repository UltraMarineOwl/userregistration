<?php
require_once "dbConfig.php";

?>
<html>
<head>
    <title>B.I.M</title>
    <link rel="stylesheet" type="text/css" href="style.css?1">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
<body>
<div class="container">
    <?php

    //isset($_COOKIE['user']) and
    if(@$_COOKIE['user'] ==''):

    ?>
    <div class="login-box">
        <h1 class="titlef">Welcome to the B.I.M.</h1>
    <div class="row">
    <div class="col-md-6 login-left">
        <h2>Login here</h2>
        <form action="auth.php" method="post">
            <div class="form-group mt-3">
                <label>Username</label>
                <input type="text" name="login" id="login" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="pass" id="pass" class="form-control" required>
            </div><br>
            <button type="submit" class="btn btn-primary"> Login </button>
        </form>
    </div>
        <div class="col-md-6 login-right">
            <h2>Register here</h2>
            <form action="check.php" method="post">
                <div class="form-group mt-3">
                    <label>Login</label>
                    <input type="text" name="login" id="login" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" id="name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="pass" id="pass" class="form-control" required>
                </div><br>
                <button type="submit" class="btn btn-primary"> Register </button>
            </form>
        </div>
    </div>
</div>
    <?php else: ?>
        <div class="topnav" id="myTopnav">
            <a href="#home" class="active">Home</a>
            <a href="./ex/map_one.html" >GeoFinder</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a href="exit.php">Logout</a>
            <a href="#about"> Hello, <?= $_COOKIE['user']?></a>
            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                <i class="fa fa-bars"></i>
            </a>
        </div>



<!---->

        <div id="map"></div>
    <?php
    require_once "./n_db/get_markers.php";

    ?>



        <div class="login-box">
            <div class="row">
                <div class="col-md-4 login-left">
                    <h2>Send bug report here.</h2>
                    <form action="bug.php" method="POST">
                        <div class="form-group">
                            <label>What bug did you find?</label>
                            <input type="text" name="bug" id="bug" class="form-control" required>
                        </div>
                      <br>
                        <button type="submit" class="btn btn-primary" value="Submit"> Send bug report. </button>
                    </form>
                </div>
                <div class="col-md-4 login-right">
                    <h2>Send your opinion about BIM, it is crucial for us.</h2>
                    <form action="op.php" method="post">
                        <div class="form-group">
                            <label>Send here.</label>
                            <input type="text" name="opinion" id="opinion" class="form-control" required>
                        </div>
                     <br>
                        <button type="submit" class="btn btn-primary"> Send an opinion. </button>
                    </form>
                </div>
                <div class="col-md-4 login-left">
                    <h2>Send your marker please</h2>
                    <form action="marker.php" method="post">
                        <div class="form-group">
                            <label>Lat.</label>
                            <input type="text" name="lat" id="lat" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Lng.</label>
                            <input type="text" name="lng" id="lng" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Text.</label>
                            <input type="text" name="text" id="text" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Title.</label>
                            <input type="text" name="title" id="title" class="form-control" required>
                        </div>
                        <br>
                        <button type="submit" class="btn btn-primary"> Send </button>
                    </form>
                </div>
            </div>
        </div>

<!--        <div id="map"></div>-->
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbsn44_xMjA-eVdo5XKokqgOZfp0KVIs8&callback=initMap&v=weekly"></script>
        <script type="text/javascript" src = "google.js"></script>

<?php endif; ?>


    <?php
    if(@$_COOKIE['user'] =='admin'):

    ?>
    <table style="
    border-collapse: collapse;
    width: 100%;
    color: #588c7e;
    font-family: monospace;
    font-size: 25px;
    text-align: left;">
        <tr>
            <th>Bug</th>
            <th>Opinion</th>
        </tr>
        <?php
        $conn=mysqli_connect("localhost","root","","monumets");
        if(!$conn){
            die('Could not Connect MySql Server:' .$conn->connect_error);
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
        ?>
    </table>


    <?php endif; ?>
</div>
</body>
</html>

