import express from 'express';
import nocache from 'nocache';
import session from 'express-session';
import { connectDb } from './src/infrastructure/db';
import dotenv from 'dotenv';
import userRouter from './src/interfaces/routes/UserRouter'
import adminRouter from './src/interfaces/routes/adminRouter'


dotenv.config()
connectDb();
const app = express();

app.use(session({

     secret:'your-secret-key',
     resave:false,
     saveUninitialized:true,
     cookie:{secure:false}
}))


app.use(nocache())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')


app.use('/',userRouter)
app.use('/',adminRouter)

app.listen(5000,()=>{

     console.log("The server started on port 5000");
     
})