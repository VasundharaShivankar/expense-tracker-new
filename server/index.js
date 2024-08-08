import express from 'express'
import mongoose, { Mongoose } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

import { postSignup, postLogin } from './controllers/user.js';
import { postTransaction, getTransactions, deleteTransaction } from './controllers/transaction.js';

//Connect to mogoDB
const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI,)
    if(connect){
        console.log('MongoDB connected')
    }
};
connectDB();

app.get('/', (req, res)=>{
    res.json({
        message: 'Welcome to expense tracker'
    })
})

//API for Sign Up
app.post('/signup', postSignup )

//API for Log In
app.post('/login', postLogin)

//API for Transaction 
app.post('/transaction', postTransaction)
app.get('/transactions', getTransactions)
app.delete('/transaction/:id', deleteTransaction)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})