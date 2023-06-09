<?php
require_once 'dbConfig.php';
$result = $db->query("SELECT * FROM `locations`");

$result2 = $db->query("SELECT * FROM `locations`");


?>

<!DOCTYPE html>
<html lang = "en-US">
<head>
    <title> Google</title>
    <meta charset = "utf-8">
    <style type="text/css">
        #mapCanvas{
            width: 100%;
            height: 650px;
        }

    </style>
    <script src="https://maps.googleapis.com/maps/api/js?key="></script>


    <script>
        function initMap(){
            var map;
            var bounds = new google.maps.LatLngBounds();
            var mapOptions = {
                mapTypeId: 'roadmap'
            };

            map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
            map.setTilt(100);


            var markers = [
                <?php
                if($result->num_rows > 0){
                    while ($row = $result->fetch_assoc()){
                        echo '["'.$row['name'].'", '.$row['latitude'].', '.$row['longitude'].', " '.$row['icon'].'"],';
                    }
                }
                ?>

            ];

            var infoWindowContent = [
                <?php
                if($result2->num_rows > 0){
                    while ($row = $result2->fetch_assoc()){
                ?>
                ['<div class="info_content">' + '<h3><?php echo $row['name'];?> </h3>' + '<p><?php echo $row['info']; ?></p>' + '</div>'],
                <?php

                }
                }

                ?>
            ];

            var infoWindow = new google.maps.InfoWindow(), marker, i;

            for(i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: markers[i][3],
                    title: markers[i][0]
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent(infoWindowContent[i][0]);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));
                map.fitBounds(bounds);
            }

                var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event){
                    this.setZoom(14);
                    google.maps.event.removeListener(boundsListener);
                });
            }
        google.maps.event.addDomListener(window, 'load', initMap);
    </script>

</head>
<body>
<div id="mapContainer">
    <div id="mapCanvas"></div>
</div>
</body>
</html>
