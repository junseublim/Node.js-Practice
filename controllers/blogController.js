const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        })
}
const blog_create = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
    })
};


const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create' });
}
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
    }).catch(err => {
        console.log(err);
        res.status(404).render('404', { title: '404' });
    });
};


const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    blog_index,
    blog_create,
    blog_create_get,
    blog_delete,
    blog_details
}