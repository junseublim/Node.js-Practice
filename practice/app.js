const express = require('express');

const app = express();


//register view engine
app.set('view engine', 'ejs');
//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    blogs = [
        { title: "hello1", snippet: "snippet1" },
        { title: "hello2", snippet: "snippet2" },
        { title: "hello3", snippet: "snippet3" },
        { title: "hello4", snippet: "snippet4" },
    ]
    //send는 알아서 status code, content type 설정해줌
    //res.send('<p>home page</p>');
    res.render('index', { title: 'Home', blogs });
});
app.get('/about', (req, res) => {

    res.render('about', { title: 'About', });
});

app.get('/about-me', (req, res) => {
    res.redirect('/about');
});
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})
//위에 아무것도 매칭하지 못하면 일로 내려와서 404페이지를 반환한다.
app.use((req, res) => {
    res.status(404).render('404');
});