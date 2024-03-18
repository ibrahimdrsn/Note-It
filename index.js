import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const blogTexts = [];
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.render("index.ejs");
});
  
app.post("/submit", (req, res) => {
    blogTexts.push(req.body["texts"]);
    res.render("index.ejs", {titletext: blogTexts});
  
});

app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    blogTexts.pop(req.body[id]);
    res.render("index.ejs", {titletext: blogTexts});
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const textToEdit = blogTexts[id];
    res.render("edit.ejs", { textToEdit, textIndex: id });
});

app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    blogTexts[id] = req.body.updatedText;
    res.render("index.ejs", { titletext: blogTexts });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
