const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')
const Users = require('./Model/UserModel')
const ProductRouter = require('./Routes/ProductRouter')
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middleware/Auth');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(Cors());
const PORT =  process.env.PORT || 8000 
const mongo_uri = process.env.MONGO_URI

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
app.use('/expense',ensureAuthenticated,ExpenseRouter);



mongoose.connect(mongo_uri)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Hahaha");
    })
})
.catch((err)=>{
console.log(err.message)
})

// mongodb+srv://shreyanshsri1807:<db_password>@testdb.v9pbz.mongodb.net/?retryWrites=true&w=majority&appName=TestDB

