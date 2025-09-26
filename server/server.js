import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import pg from "pg"

//instansiate the server 

const app = express ()

//setup middleware (annoying config things)

//so our server can read json

app.use(express.json())
//loads our environment variable
dotenv.config()
//allows our server to talk to other servers
app.use(cors())

// set up database connection

const db = new pg.Pool({
    connectionString: process.env.DB_CONN
})
app.get('/', (req, res)=>{
    res.status(200).json('You are looking at my root route! How dare you!')
})
 //quering our database is asynchronous.

 app.get('/jokes', async (req,res)=>{
    //fetch all jokes from sql table

    const result =await db.query('SELECT * FROM jokes')
    res.json(result.rows)
 })

 //I'll make a post route to allow people to make new jokes

 app.post ('/jokes', async(req,res)=>{
    //When the client sends up information it is always in the request.body
    const body = req.body
    
    const jokeFromClient = req.body.joke
    const punchlineFromClient = req.body.punchline 

    //we use $1, $2 as a placeholders so we aren't just putting whatever sends us in the string.

    const data = await db.query('INSERT INTO jokes(joke, punchline) VALUES ($1,$2)', [jokeFromClient, punchlineFromClient])

    res.json ({status: 'Joke inserted into database'})
 })


app.listen(2222, ()=>{
    console.log('Server started on http://localhost:2222')
})