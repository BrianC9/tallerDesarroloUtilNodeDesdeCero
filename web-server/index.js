console.clear()
import { createServer } from 'http'

const server = createServer((req, res) => {
    let data = ''
    let chunkIndex = 0
    req.setEncoding('utf-8')
    if (req.method === 'POST') {

        req.on('data', (chunk) => {
            data += chunk;
            chunkIndex++
            console.log(chunkIndex, chunk)
        })
        req.on('end', () => {
            console.log("Recibido POST method", data.toString())
        })

    } else if (req.method !== 'POST') {
        res.end(req.method)
    }
    console.log('PETICION RECIBIDA')

})

server.listen(3000)