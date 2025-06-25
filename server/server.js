import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'


//App config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

//initialize middleware
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => res.send("API working"))
app.use((req, res, next) => {
    if (req.path.includes('/api/user/webhooks')) {
        console.log("🔥 WEBHOOK REQUEST RECEIVED:");
        console.log("Method:", req.method);
        console.log("Path:", req.path);
        console.log("Headers:", req.headers);
    }
    next();
});
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.listen(PORT, () =>  console.log("Server running on the port "+PORT))
