module.exports = io =>{
    io.on('connection',(socket) => {
        console.log('New User conected');

        socket.on('usserCoordenates', coords => {
            console.log(coords);
            //socket.broadcast.emit('newUserCoordinates', coords);
            socket.broadcast.emit('newUserCoordinates',coords);
        } );
        
    });
}