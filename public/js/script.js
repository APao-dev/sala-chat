const socket = io();
let inputCampo = document.querySelector('#campo-chat');
let boton = document.querySelector('#enviar')
let botonSala = document.querySelectorAll('button.salas')
let chatBox = document.querySelector('#chat-box')
    // Emitimos un evento con un mensaje


function enviarChat(e) {
    e.preventDefault()

    // console.log(inputCampo.value);
    socket.emit('mensaje', inputCampo.value);
   
}
boton.addEventListener('click', enviarChat)

// document.querySelector('button').addEventListener('click', enviarDatos) //o hacer onclick en index y activar la función

//Recibimos el mensaje enviado
socket.on('mensaje', (data) => {
    chatBox.innerHTML += `<div class="alert alert-info" sole="alert"> ${data}</div>`
        // let divChat = document.querySelector('#chat-box')
        // divChat.innerHTML += `<p>Usuario id:${data}</p>`

})

// Agregamos el evento a los botones
for (let i = 0; i < botonSala.length; i++) {
    botonSala[i].addEventListener('click', function() {
        socket.emit('nuevo canal', this.textContent)
    })
}

socket.on('nuevo canal', (canal) => {
    alert(`Estas en la ${canal}`)
})


// botonSala.forEach((boton) => {
//     boton.addEventListener('click', function() {
//         console.log(this.textContent)
//     })
//     console.log(boton.textContent)
// })