const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const blgoRoutes = require('./routes/blogRoutes');
//connect to MongoDB
const dbURI = 'mongodb+srv://junslim10:expressdb11@cluster0.zm7zm.mongodb.net/Expressdb?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    console.log('connected to db');
    app.listen(3000);
}).catch((err) => {
    console.log(err);
})

//register view engine
app.set('view engine', 'ejs');


//middleware : use next() to move on
app.use((req, res, next) => {
    console.log('middleware');
    next();
})

app.use(morgan('dev'));

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    //send는 알아서 status code, content type 설정해줌
    //res.send('<p>home page</p>');
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {

    res.render('about', { title: 'About', });
});
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});
app.use('/blogs', blgoRoutes);

//위에 아무것도 매칭하지 못하면 일로 내려와서 404페이지를 반환한다.
app.use((req, res) => {
    res.status(404).render('404');
});