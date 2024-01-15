import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/blog", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/form", (req, res) => {
  const data = {
    fullName: req.body.fullName,
    blogTitle: req.body.blogTitle,
    blogPost: req.body.blogPost,
  };
  const blog = JSON.stringify(data, null, 2);
  fs.appendFile("public/blogs.txt", blog, (err) => {
    if (err) throw err;
    console.log("File saved successfully!");
  });
  res.status(200).send(data);
});

app.get("/blogs", (req, res) => {
  fs.readFile("public/blogs.txt", "utf8", (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/blogs/:blogTitle", (req, res) => {
  const { blogTitle } = req.params;
  const foundItem = existing.find((blog) => blog.blogTitle === blogTitle);
  if (!foundItem) {
    res.status(404).send("Title does not exist");
  } else {
    res.status(200).send(foundItem);
  }
});
app.patch("/blogs/:blogTitle", (req, res) => {
  const { blogTitle } = req.params;
  const { fullName, blogPost } = req.body;
  const item = existingBlogs.find((item) => item.blogTitle === blogTitle);

  if (fullName) item.fullName = fullName;
  if (blogTitle) item.blogTitle = blogTitle;
  if (blogPost) item.blogPost = blogPost;
  res.status(200).send("Updated successfully!");
});

app.delete("/blogs/:blogTitle", (req, res) => {
  const { blogTitle } = req.params;
  existingBlogs = existingBlogs.filter((item) => item.blogTitle !== blogTitle);
  console.log(existingBlogs);
  res.send(`Blog with the title "${blogTitle}" has been deleted successfuly!`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
