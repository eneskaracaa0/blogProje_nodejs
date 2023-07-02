const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes = require('./routes/BlogRoutes');

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const dbURL =
    "mongodb+srv://deneme:deneme123@cluster0.tbfaonw.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connect success");
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

const path = require("path");
const { truncateSync } = require("fs");
const { log } = require("async");

/*
req'in altındaki methodları kullanarak isteğin raporlamasına ulaşabiliriz.
app.use((req, res, next) => {
    console.log(req.method); //GET
    next();
});
*/

//ALTERNATİF OLARAK  MORGAN KÜTÜPHANESİ
app.use(morgan("tiny"));

app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "./views/index.html"));
    res.redirect('/blog');
});


app.use('/admin', adminRoutes);
app.use('/blog', blogRoutes);



app.get("/about", (req, res) => {
    // res.sendFile(path.join(__dirname, "./views/about.html"));
    res.render("about", { title: "Hakkımızda" });
});

app.get("/hata", (req, res) => {
    // res.sendFile(path.join(__dirname, "./views/hata.html"))
    res.render("hata", { title: "Sayfa Bulunamadı" });
});

app.get("/about-us", (req, res) => {
    res.redirect("/about");
});

app.get("/login", (req, res) => {
    res.render("login", { title: "Giriş" });
});

app.use((req, res) => {
    // res.status(404).sendFile(path.join(__dirname, './views/hata.html'))
    res.status(404).render("hata", { title: "Hata" });
});