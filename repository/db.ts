import { createPool } from 'mysql2';
export const connection = createPool({
    // prefer to use .env for environment variables to hide passwords
    host: process.env.host,
    port: 3306,
    user: process.env.user,
    password: process.env.password,
    database:  process.env.database
});