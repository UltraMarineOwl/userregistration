function loadMarkers()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            alert(this.responseText);
            var markers = eval(this.responseText);
           // alert(markers[0].lat);
        }
    };
    xmlhttp.open("GET", "get_markers.php", true);
    xmlhttp.send();
}