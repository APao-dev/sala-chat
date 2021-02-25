const express = require('express');
const app = express();
//al servidor que creamos le vamos a anexar otros protocolos => TCP y http
const http = require('http').Server(app);
const path = require('path')
const io = require('socket.io')(http)

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log('Usuario conectado');
    //Emitimos mensaje desde el servidor
    let canal = 'sala1'
    console.log(socket.rooms)

    socket.on('mensaje', (data) => {
        io.in(canal).emit('mensaje', data);

        // console.log(data)
    })


    // Evento de desconcección
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');

    })

    socket.on('nuevo canal', (nuevaSala) => {
        socket.leave(socket.rooms) //para salir de la sala
        socket.join(nuevaSala) //unirnos usamos el método join
        canal = nuevaSala;
        socket.emit("nuevo canal", nuevaSala)
        console.log(nuevaSala)
    })
})


http.listen(8080, () => {
    console.log('Escuchamos puerto 8080');
})