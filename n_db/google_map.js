// Initialize and add the map

var user = {lat: 47.0255022014002, lng: 28.830313682556156};
//this function create javascript variable markers


var map;



function initMap()
{

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: user,
    });

    for (var i=0; i<markers.length; i++)
    {
        marker = new google.maps.Marker({
            position: markers[i],
        });

        marker.setMap(map);
    }
    updateMap();
}
//updateMap();
setInterval(updateMap, 10000);

function updateMap()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(
            (position) =>
            {
                const pos =
                    {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

            },
            () =>
            {
                alert("Error");
            });
    } else
        {
        // Browser doesn't support Geolocation
            alert("Browser doesnt support");
        }

    //alert("Lat = "+ pos.lat + " Lng  = " + pos.lng);
    user.lat = user.lat + 1;
    user.lng = user.lng + 1;
    markers = new google.maps.Marker({
        position: user,
        title: "Hello World!",
        //icon: image,
    });
    markers.setMap(map);
}



