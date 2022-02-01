const express = require('express');
const cors = require('cors');
const { create_user, get_quiz, submit_quiz, get_score, get_leader_board } = require('./controller/quizController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })

  //base route
app.get('/', (req,res)=>{
    res.send("Welcome to the API!")
})
//route to get scores of a player
//INPUTS --  (uuid) : string 
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

//route to create a user
//INPUTS -- { (uuid) : string 
//           (name) : string}
app.get('/api/set/user', (req, res) => {
    create_user(req.query).then((usr)=>{
        if(usr){
            res.send(usr)
        }else{
            res.status(400).send(`There is an error in the server while setting user`);
        }
    })
});


//route to get questions
// INPUTS -- {number: no.of questions
//            userId: string, 
//            level: number}
app.get('/api/get/questions', (req, res) => {
    get_quiz(req.query).then((quiz)=>{
        if(quiz){
            res.send(JSON.stringify(quiz))
        }else{
            res.status(400).send(`There is an error in the server while getting questions`);
        }
    })
});

//route to submit the quiz
// INPUT : attempt object
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

//route to get leader board
app.get("/api/get/leader/board", (req,res)=> {
        get_leader_board().then((arr)=>{
            console.log("sending",arr)
            res.send(arr)
        }).catch((e)=>{
            res.status(400)
        })
})

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));