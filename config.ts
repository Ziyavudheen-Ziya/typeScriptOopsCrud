import dotenv from 'dotenv'

dotenv.config()

export const config = {
     
     PORT:process.env.PORT || 5000,
     MONGO_URI : process.env.MONGO_URL || "mongodb://localhost:27017/UMS"
}