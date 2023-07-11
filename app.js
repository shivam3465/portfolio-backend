import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express'
import userRouter from './routers/user.js';
import skillsRouter  from './routers/skills.js';
import codingRouter  from './routers/coding.js';
import projectRouter  from './routers/project.js';
import cors from 'cors'

const app = express();
app.use(cors({
    origin: "http://127.0.0.1:3000",
    methods: ['GET','POST','PUT','DELETE'],
    credentials:true,
}))


// middlewares 
app.use(express.json({limit: "50mb"}));
app.use(urlencoded({extended: true,limit:"50mb"}));
app.use(cookieParser());

// routes
app.use('/api/v1',userRouter);
app.use('/api/v1',skillsRouter);
app.use('/api/v1',codingRouter);
app.use('/api/v1',projectRouter);

export {app}