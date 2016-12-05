var $ = require('jQuery');
require('dotenv').config();

$.getScript("https://maps.googleapis.com/maps/api/js?key=" + process.env.MAP_API + "-dwII", function(){

   alert("Script loaded but not necessarily executed.");


   function initMap() {
        navigator.geolocation.getCurrentPosition((locObj) => {
            var myLatlng = new google.maps.LatLng(locObj.coords.latitude, locObj.coords.longitude);
            var mapOptions = {
                zoom: 9,
                center: myLatlng
            }
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                title: "OpenInvite",
                map: map
            });

            map.addListener('click', function(e) {
                placeMarkerAndPanTo(e.latLng, map);
            });


            function placeMarkerAndPanTo(latLng, map) {
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
                // map.panTo(latLng);
            }

        })
    }
});