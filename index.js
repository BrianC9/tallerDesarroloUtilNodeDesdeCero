import basicas from './operaciones.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const users = require('./users.json')
console.log(users)