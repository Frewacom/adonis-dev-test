import Ws from 'App/Services/Ws'
import Logger from '@ioc:Adonis/Core/Logger'

Ws.start((socket) => {
    socket.emit('start', { hello: 'from server' })

    socket.on('test', (data) => {
        Logger.info(data)
    })
})
