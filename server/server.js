import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import pg from "pg"



const app = express ()


app.use(express.json())

dotenv.config()

app.use(cors())



const db = new pg.Pool({
    connectionString: process.env.DB_CONN
})
app.get('/', (req, res)=>{
    res.status(200).json('You are looking at my root route! How dare you!')
})
 

 app.get('/entries', async (req,res)=>{
    
    const result =await db.query('SELECT * FROM guestbook ORDER BY created_at DESC');
    res.json(result.rows);
 });


 app.post ('/entries', async(req,res)=>{
    
    const body = req.body
    
    const messengerFromClient = req.body.messenger
    const messageFromClient = req.body.message


    const data = await db.query('INSERT INTO guestbook(messenger, message) VALUES ($1,$2)', 
        [messengerFromClient, messageFromClient])

    res.json ({status: 'New message submitted in guestbook'})
 })


app.listen(2222, ()=>{
    console.log('Server started on http://localhost:2222')
})