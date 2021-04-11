const WebSocketClient = require('websocket').client

const dungeon = 'test2'

//new WebSocketClient()

function createUser(username){
    return new Promise((resolve, reject) =>{
        const socket = new WebSocketClient()
        socket.connect("ws://" + 'mud-golem.com:1996' + "/chat/" + dungeon + "/" + username);
        socket.on('connect', (connection) => {
            resolve(connection)
        })
    })   
}

async function main() {
    const connections = await Promise.all(Array(100).fill(0).map(Number.call, Number).map(i => createUser(`User ${i}`)))
    connections.forEach((connection, uid) => {
        for (let i = 0; i < 1000; i++) {
            connection.send(`Nachricht ${i}`, ()=>console.log(`${uid} : ${i}`))            
        }
        connection.close()
    })
}

main()