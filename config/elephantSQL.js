import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()


const db = new Sequelize(process.env.DB_NAME || 'ufgujxko', 
                        process.env.DB_USER || 'ufgujxko', 
                        process.env.DB_PASS || 'g92Jwan6M8AW6HQHBUwhMlF4qiN7NPsc', 
    {
        host: process.env.DB_HOST || 'mel.db.elephantsql.com', 
        dialect:'postgres'
    })

export default db