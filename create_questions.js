const Question = require("./schemas/question");

const level = 1

const questions = {1: "Why does Jay prefer Java Script?",
2: "Why does Jay prefer backend over frontend?",
3: "Why did Jay create this quiz app?",
4: "Which site is Jay more active on?",
5: "How much time did he spend coding this quiz?",
6: "Which was the most hardest part of building this quiz app?",
7: "When does Jay go to bed?",
8: "Why did Jay co-founded melofi.com?",
}

const answers = {1: [0,2],
2:[0,3],
3: [0,1,2,3],
4: [1],
5: [1],
6: [0],
7:[2],
8:[2]}
const options = {
    1: ["Because he doesn't want an easy life.", 
        "JS is speed.",
        "Because JS can be used to code backend and frontend.",
        "Because it starts with J."
        ],
    2: ["Because he sucks at picking colour.",
        "Just Cause.",
        "FE is boring.",
        "He likes writting algorithms."
       ],
    3:[
       "Becuase he has no life.",
       "Trying to score an internship.",
       "Because he wanted to try Svelte framework.",
       "He wants to make friends through this app"],
    4:["Instagram",
       "Stack overflow",
       "LinkedIn", 
       "Github"],
    5:["6 hours",
       "3 sleepless nights",
       "2 months",
       "He outsourced it"],
    6:["Choosing color theme",
       "Choosing the stack", 
       "Coming up with questions",
       "Designing FE"],
    7:[
       "Only on full moon nights",
       "Day Time", 
       "He doesn't",
       "Once every 24 hours"],
    8:["To solve world hunger",
       "Just cause",
       "Solve the networking problem in Music Industry",
       "To make friends"],
}
for (const [key, value] of Object.entries(questions)) {
    // console.log(key,value)
    const q = new Question()
    q.ask = value
    q.options = options[key]
    q.answers = answers[key]
    q.save().then((doc)=>console.log(`Question created : ${doc.ask}`))
}

