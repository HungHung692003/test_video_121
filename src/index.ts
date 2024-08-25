import { initFolder } from './../utils/file'
import DatabaseService from './services/database.services'
import UserRouter from './routes/users.routes'
import express from 'express'
import { defaultErrorHandler } from './middlewares/ErrorHandler'
import path from 'path'
import cors from 'cors' // Import cors
import mediasRouter from './routes/medias.routes'

const app = express()
// Sử dụng cookie-parser middleware

const port = 3000

console.log(process.argv)

initFolder() // nếu trong server chưa có file " uploads " chỉ cần chạy lại server thì tạo lại 1 file mới

app.use(
  cors({
    origin: 'http://localhost:3001', // Địa chỉ của ứng dụng frontend
    credentials: true // Cho phép gửi cookie cùng với request
  })
)
 
app.use(express.json())

// Middleware để phục vụ các file tĩnh
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api', UserRouter)

app.use('/medias', mediasRouter)

//database
DatabaseService.connect()

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server đang chạy ở: http://localhost:${port}/`)
})
