

const map=L.map('map-template').setView([-12.0451677,-76.9767837,17],13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(map);
const socket= io();
//openstreetmap/wiki/tile

map.locate({enableHighAccuracy:true});

map.on('locationfound', e => {
    console.log(e);
    const coords=[e.latlng.lat,e.latlng.lng];
    const marker=L.marker(coords);
    marker.bindPopup('xx There!');
    map.addLayer(marker);
    socket.emit('usserCoordenates',e.latlng);
    
});

function animar () {
  // ... realizar un proceso cada que cambie la ubicación del usuario

  navigator.geolocation.getCurrentPosition(function(position) 
	{
      				
	var newcoords=[position.coords.latitude,position.coords.longitude];
	 var  newmarker=L.marker(newcoords);
    //var datos='<?php echo $_SESSION["datos"]; ?>';
    newmarker.bindPopup("vsdsdfd");
    map.addLayer(newmarker);
    var obj={
      lat:position.coords.latitude,
      lng:position.coords.longitude
    };
    //send(position.coords.latitude+","+position.coords.longitude+","+datos);
    socket.emit('usserCoordenates',obj);
   
  });    






}


//const watcher = navigator.geolocation.watchPosition(mostrarUbicacion);

setTimeout(() => {
  animar();
}, 5000);

var timestamp=new Date().getTime();
function checkResume()
{
    var current=new Date().getTime();
    if(current-timestamp>100)
    {
        var event=document.createEvent("Events");
        event.initEvent("focus",true,true);
        document.dispatchEvent(event);
    }
    timestamp=current;
}

window.setInterval(checkResume,1);
document.addEventListener("focus",function()
{
    animar();
},false);


/*setInterval(function() {
    map.on('locationfound', e => {
        console.log(e);
        const coords=[e.latlng.lat,e.latlng.lng];
        const marker=L.marker(coords);
        marker.bindPopup('new Ubicacion');
        map.addLayer(marker);
        console.log(coords);
        socket.emit('usserCoordenates',e.latlng);
        
    });

}, 5000);*/

socket.on('newUserCoordinates', (coords) => {


    const marker2=L.marker([coords.lat,coords.lng]);
    marker2.bindPopup('Help There!');
    map.addLayer(marker2);
    
    //socket.emit('usserCoordenates',coords);
   
});
/*
setInterval(function() {
    location.reload(true)

}, 5000);*/





/*
const marker=L.marker([-12.0451677,-76.9767837,17]);
marker.bindPopup('Help There!');
map.addLayer(marker);*/