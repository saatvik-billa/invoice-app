const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const express = require('express');
const path = require('path'); 

const customerRouter = require('./routers/customerRouter');
const invoiceRouter = require('./routers/invoiceRouter');
const viewRouter = require('./routers/viewRouter'); 

const app = express(); 

// set up the pug engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // where the views folder is located

app.use(express.static(path.join(__dirname, 'resources')));

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('DB Connection Successful!'))
.catch((err) => {
    console.log(err)
});

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // need this in order to parse data coming from a url encoded form

app.use('/', viewRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/invoices', invoiceRouter); 

app.listen(8000, () => {
    console.log("Listening to requests on port 8000...")
});


