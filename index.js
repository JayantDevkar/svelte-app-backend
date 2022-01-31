
const express = require('express');
const cors = require('cors');
const { create_user, get_quiz, submit_quiz, get_score, get_leader_board } = require('./controller/quizController');
const User = require('./schemas/user');
const bodyParser = require("body-parser");
const { get } = require('mongoose');

const app = express();
const PORT = 5000;
// app.use(bodyParser.json());
// Apply CORS policy
app.use(express.json()); 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
app.use(cors())

app.get('/api/get/scores', (req,res) => {
    console.log("route pinged")
    get_score(req.query.uuid).then((arr)=>{
        console.log("the arr",arr)
        if(arr.length > 0){
            res.send(arr)
        }else{
            res.send(false)
        }
    }).catch((e)=>{
        res.send(false)
    })
})

app.get('/api/set/user', (req, res) => {
    // console.log(req)
    create_user(req.query).then((usr)=>{
        if(usr){
            res.send(usr)
        }else{
            res.status(400).send(`There is an error in the server while setting user`);
        }
    })
});


app.get('/api/get/questions', (req, res) => {
    // console.log(req)
    get_quiz(req.query).then((quiz)=>{
        if(quiz){
            console.log("Sending quiz",quiz)
            res.send(JSON.stringify(quiz))
        }else{
            res.status(400).send(`There is an error in the server while getting questions`);
        }
    })
});

app.get("/api/submit/quiz", (req,res)=>{
    submit_quiz(JSON.parse(req.query.answer)).then((attempt)=>{
        // console.log("THE LAST FEED",attempt)
        if(attempt){
            res.send(JSON.stringify(attempt))
        }else{
            // res.status(400).send(`There is an error in the server while submmiting quiz`);
            res.send(false)
        }
    })
})

app.get("/api/get/leader/board", (req,res)=> {
        get_leader_board().then((arr)=>{
            console.log("sending",arr)
            res.send(arr)
        }).catch((e)=>{
            res.status(400)
        })
})

// Assign the PORT to our app
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));