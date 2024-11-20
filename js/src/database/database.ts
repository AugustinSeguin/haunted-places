import mysql from 'mysql2/promise';

class Database {
    private static instance: mysql.Connection;

    private constructor() { }

    public static async getInstance(): Promise<mysql.Connection> {
        if (!Database.instance) {
            Database.instance = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'password',
                database: 'haunted_places'
            });
            console.log('Database connection established');
        }
        return Database.instance;
    }
}

export default Database;
