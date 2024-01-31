import pgPromise from 'pg-promise';

const pgp = pgPromise({});

const connection = {
    host: 'localhost',
    port: 5432,
    database: 'profindr_marble',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

console.log("from db file",process.env.DB_PASSWORD);
console.log("from db file",process.env.DB_USER);
const db = pgp(connection); 

const testConnection = async () => {
    try {
        await db.connect();
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database');
        console.log(error);
    } finally {
        db.$pool.end();
    }
}

export { db, testConnection };