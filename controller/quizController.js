const { urlencoded } = require("express");
const Attempt = require("../schemas/attempt");
const Question = require("../schemas/question");
const User = require("../schemas/user");

const create_user = (user)=>{
    return new Promise((resolve,reject)=>{
        console.log("user in func",user)
        User.findOne({uuid : user.uuid}).then((usr)=>{
            if(usr){
                resolve(usr)
            }else{
                const usr = new User()
                usr.name = user.name
                usr.uuid = user.uuid
                usr.save().then((u)=>{
                    console.log("Resolving",u)
                    resolve(u)
                }).catch((e)=>{
                    console.log(e)
                    resolve(false)})
            }
        })
    })
}

// const obj = id_list.map((y) => {
//     return ObjectID(y);
//   });
//   let obj_arr = await obj;

const check_question = (qId, ansNum)=>{
    return new Promise((resolve,reject)=>{
        console.log("INput for check",qId, ansNum )
        Question.findById(qId).then((question)=>{
            var feed = {}
            if(question.answers.includes(ansNum)){
                feed['isCorrect'] = true
                feed['asked'] = question.ask
                feed['answered'] = question.options[ansNum]
            }else{
                feed['isCorrect'] = false
                feed['asked'] = question.ask
                feed['answered'] = question.options[ansNum]
                feed['correct'] = question.options[question.answers[0]]
            }
            resolve(feed)
        })
    })
}
const evaluate_quiz = (q_arr,ansObj)=>{
    return new Promise(async(resolve,reject)=>{
        console.log("INput for eval",q_arr ,ansObj)
       var score = 0;
       const looper = q_arr.map(async(questionId)=>{
           let feed = await check_question(questionId, ansObj[questionId])
           if(feed.isCorrect){
               score+=1
           }
           return feed;
       })
       let waiter = await Promise.all(looper)
       console.log("Returning form evaluate_quiz",waiter)
       let resp = {arr:waiter, score:score}
       resolve(resp)
    })
}

const submit_quiz = (ansObj)=> {
    return new Promise((resolve,reject)=>{
        Attempt.findById(ansObj.attemptId).then(async(attempt)=>{
            console.log("SUBMIT OBJ = ",ansObj)
            const ok = await evaluate_quiz(attempt.questions,ansObj)
            console.log("Outside submit quiz",ok)
            attempt.isSubmitted = true;
            attempt.feedBack = ok.arr
            attempt.score = ok.score
            attempt.save().then((atmp)=>{
                resolve(atmp)
            })
        })

    })
}

const get_quiz = (details)=>{
    return new Promise((resolve,reject)=>{
        const attempt = new Attempt()
        attempt.userId = details.uuid
        // Question.find({level : {$in : details.level}})
        let lvl = details.level.includes(2) ? [1,3] : [Number(details.level)]
        console.log("level == ",details, lvl)
        Question.aggregate([
            { $match: {"$and" : [{level: {$in : lvl}}]} },
            { $sample: { size: Number(details.number)} },
          ]).project({answers: 0}).then(async (questionsArr) => {
            var mssgs = questionsArr.map((val)=> attempt.questions.push(val._id))
            let ok = await Promise.all(mssgs);
            attempt.save().then((atmp)=>{
                const q = {attemptId:atmp._id, quiz: questionsArr}
                console.log("Sending quiz",q)
                resolve(q)
            }          
            ).catch((e)=>{
                console.log("error",e)
                resolve(false)
            })
          });
    })
}

const get_score= (uuid)=>{
    return new Promise((resolve,reject)=>{
    Attempt.find({userId:uuid, isSubmitted:true}).sort({time:-1}).then((arr)=>{
        if(arr.length > 0){
            resolve(arr[0])
        }else{
            resolve([])
        }
    })
})
}
const get_user= (uuid)=> {
    return new Promise(async(resolve,reject)=>{
    User.findOne({uuid:uuid}).then((usr)=>{
        resolve(usr)
    })
})
}

const get_leader_board = ()=>{
    return new Promise((resolve,reject)=>{
        Attempt.find({isSubmitted:true}).sort({score : 1, time: 1}).limit(10).then(async(arr)=>{
            var users = arr.map(async(x)=>{
                let usr = await get_user(x.userId)
                var item = {
                    name: usr.name,
                    score: x.score,
                    date : new Date(x.time).toLocaleDateString('en-GB')
                }
                console.log("itemn",item)
                return item
            })
            let waiter = await Promise.all(users)
            console.log("okokok",waiter)

            resolve(waiter)
        })

    })
}

module.exports={
    get_quiz,
    create_user,
    submit_quiz,
    get_score,
    get_leader_board
}