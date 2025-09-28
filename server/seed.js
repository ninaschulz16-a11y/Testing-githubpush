import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
connectionString: process.env.DB_CONN

});

async function seed() {

    try {
        const trialEntries = [
        { messenger: 'Alejandro', message: 'do not call my name!'},
        { messenger: 'Fernando', message: 'I am not your babe!' },
        { messenger: 'Roberto', message: 'What an interesting Guestbook!' },
     ];
     for (const entry of trialEntries) {
        await db.query(
            'INSERT INTO guestbook (messenger, message) VALUES ($1,$2)',
                 [entry.messenger, entry.message]
        );
     }
     console.log('Info inserted with great results!');
     await db.end();
     process.exit(0);
    
    } catch (err) {
     
        console.error(err);
     await db.end();
        process.exit(1);
    }
}
seed();