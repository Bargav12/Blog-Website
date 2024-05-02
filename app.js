//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to Daily Journal, your digital haven for daily introspection, exploration, and personal evolution. Step into a world where each day unfolds a new chapter in your story, a canvas for self-expression and growth. Whether you're seeking solace, inspiration, or simply a space to collect your thoughts, Daily Journal is here to accompany you on your journey. Join our community of avid journalers as we navigate life's twists and turns, one entry at a time. Embrace the power of reflection, find clarity amidst the chaos, and embark on a transformative voyage of self-discovery with us.";
const aboutContent = "At Daily Journal, we are passionate about fostering a community of introspection, growth, and connection. Our journey began with a simple idea: to provide a digital sanctuary where individuals could embark on a daily exploration of self-discovery. What started as a personal endeavor has evolved into a vibrant platform where users from all walks of life come together to share their stories, insights, and experiences. Our mission is to inspire and empower our community to embrace the power of reflection, find beauty in the mundane, and cultivate a deeper understanding of themselves and the world around them. Join us on this transformative journey as we strive to make each day count.";
const contactContent = "Have a question, suggestion, or just want to say hello? We'd love to hear from you! Drop us a line using the form below, and our team will get back to you as soon as possible. Your feedback is invaluable to us as we continue to improve and grow. Whether you're interested in collaboration opportunities, have technical inquiries, or simply want to share your thoughts, don't hesitate to reach out. We're here to listen and support you every step of the way. Thank you for being a part of our community!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
