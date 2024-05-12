import { createPool } from 'mysql2';
export const connection = createPool({
    // prefer to use .env for environment variables to hide passwords
    host: 'db4free.net',
    port: 3306,
    user: 'hemanshu',
    password: 'Hemanshu@1602',
    database: 'hemanshu'
});