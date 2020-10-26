import app from './app'
import connection from './database/connections'
import { PORT } from './config/config'

export async function startServer(): Promise<void> {
  await connection.create()
  app.listen(PORT || 3333, () => {
    console.log(`🏃‍♂️ Server Started on Port ${PORT || 3333}`)
  })
}

startServer()
