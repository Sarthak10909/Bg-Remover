import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'
import { clerkWebhooks } from './controllers/UserController.js'


//App config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

//initialize middleware
app.use(express.json())
app.use(cors())

//app.post('/api/webhooks/clerk', clerkWebhooks)
app.get('/', (req,res) => res.send("API working"))
app.use('/api/user', userRouter)

app.listen(PORT, () =>  console.log("Server running on the port "+PORT))