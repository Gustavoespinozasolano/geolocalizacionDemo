

const map=L.map('map-template').setView([-12.0451677,-76.9767837,17],13);

const socket= io();
//openstreetmap/wiki/tile
var urlTile='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
/*L.tileLayer(urlTile, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);*/



L.tileLayer(urlTile).addTo(map);
map.locate({enableHighAccuracy:true});

map.on('locationfound', e => {
    console.log(e);
    const coords=[e.latlng.lat,e.latlng.lng];
    const marker=L.marker(coords);
    marker.bindPopup('xx There!');
    map.addLayer(marker);
    socket.emit('usserCoordenates',e.latlng);
    
});
const watcher = navigator.geolocation.watchPosition(mostrarUbicacion);

setTimeout(() => {
  navigator.geolocation.clearWatch(watcher);
}, 5000);

function mostrarUbicacion (ubicacion) {
  // ... realizar un proceso cada que cambie la ubicación del usuario
  const lng = ubicacion.coords.longitude;
  const lat = ubicacion.coords.latitude;
  console.log(`longitud: ${ lng } | latitud: ${ lat }`);
  const coords=[lat,lng];
  const marker=L.marker(coords);
  
  marker.bindPopup('new Ubicacion');
  map.addLayer(marker);
  console.log(coords);
  socket.emit('usserCoordenates',coords);
}
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