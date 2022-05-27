console.clear()
import { createServer } from 'http'

const server = createServer((req, res) => {
    if (req.method === 'POST') {
        res.end("Recibido POST method")
    } else if (req.method !== 'POST') {
        res.end("Recibido otro method")
    }
    console.log('PETICION RECIBIDA')

})

server.listen(3000)