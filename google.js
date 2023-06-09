

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


var markers = JSON.parse(document.getElementById("markekrjee1lek12l32j").getAttribute("aaaa"));

function initMap (){


    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();

    var mol = { lat: 47.0245117, lng: 28.8322923 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 9,
        center: mol,
    });

///////////////////////////////////////////////////////
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: mol,
    });

    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.mol,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.mol.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });


    ///////////////////////////////
    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Moldova</h1>' +
        '<div id="bodyContent">' +
        "<p><b> Moldova</b>, country lying in the northeastern corner of the Balkan region of Europe. " +
        "Its capital city is Chișinău, located in the south-central part of the country.Formerly known as Bessarabia, " +
        "this region was an integral part of the Romanian principality of Moldavia until 1812, when it was ceded to " +
        "Russia by its suzerain, the sultan of the Ottoman Empire. Bessarabia remained a province of the Russian " +
        "Empire until after World War I, when it became a part of Greater Romania, and it reverted to Russian " +
        "control in 1940–41 and again after World War II, when it was joined to a strip of formerly Ukrainian " +
        "territory, the Moldavian Autonomous Soviet Socialist Republic, on the left bank of the " +
        "Dniester River (Moldovan: Nistru) to form the Moldavian Soviet Socialist Republic. Upon the collapse " +
        "of the Soviet Union in August 1991, this republic declared its independence and took the name Moldova. " +
        "It became a member of the United Nations in 1992.</p>" +
        '<p>Attribution: Moldova, <a href="https://www.britannica.com/place/Moldova">' +
        "https://www.britannica.com/place/Moldova</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";
/////

  /////

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    const marker = new google.maps.Marker({
        position: mol,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });

    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Set cursor on current location";
    locationButton.classList.add("custom-map-control-button");
    locationButton.style.backgroundColor = "#04AA6D";
    locationButton.style.color = "rgb(25,25,25)";
    locationButton.style.fontFamily = "Roboto,Arial,sans-serif";
    locationButton.style.fontSize = "14px";
    locationButton.style.lineHeight = "38px";
    locationButton.style.paddingLeft = "5px";
    locationButton.style.paddingRight = "5px";
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Your current position.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    }

    var infoWindow1 = new google.maps.InfoWindow();

    for (var i = 0; i < markers.length; i++) {
        var data = markers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker1 = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title,
            draggable: true,
            animation: google.maps.Animation.DROP
        });

        //Attach click event to the marker.
        (function (marker1, data) {
            google.maps.event.addListener(marker1, "click", function (e) {
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infoWindow1.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
                infoWindow1.open(map, marker1);
            });
        })(marker1, data);
    }






}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

