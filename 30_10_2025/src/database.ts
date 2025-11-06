import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

let connection: mysql.Connection | null = null

export default async function connectToDatabase() {
  if (connection) {
    return connection
  }
  dotenv.config()
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE
  })
  connection = conn
  return conn
}
