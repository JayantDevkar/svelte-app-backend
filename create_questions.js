const Question = require("./schemas/question");

const level = 3

// const questions = {1: "Why does Jay prefer Java Script?",
// 2: "Why does Jay prefer backend over frontend?",
// 3: "Why did Jay create this quiz app?",
// 4: "Which site is Jay more active on?",
// 5: "How much time did he spend coding this quiz?",
// 6: "Which was the most hardest part of building this quiz app?",
// 7: "When does Jay go to bed?",
// 8: "Why did Jay co-founded melofi.com?",
// }

const questions_lvl_3 = {
   1: "What is Jay's favorite band?",
   2: "What City is Jay from?",
   3: "Which of the phrase does Jay use the most frequently?",
   4: "What exercise does Jay most commonly do?",
   5: "Where can Jay be found if he is not in his room coding?",
   6: "Who is Jay's favorite comedian?",
   7: "What does Jay's sleep schedule look like?",
   8: "What is the name of Jay's startup?",
   9: "How long can Jay go without roasting his roomates?",
   10: "How sarcastic is Jay?",
   11: "How many hours he spends coding in a day?",
   12: "How often does Jay do school work?",
   13: "What would be Jay's profession if he wasn't a programmer?",
}

const answers = {1: [0,2],
2:[3],
3: [1,0],
4: [1],
5: [2,3],
6: [0,1,2,3],
7:[1,2,3],
8:[1],
9:[0],
10:[0,1,2],
11:[1,2],
12:[1,2],
13:[0]}

const options = {
    1: ["Linkin Park", 
        "Green Day",
        "Rainbow Kitten Surprise",
        "Queen"
        ],
    2: ["San Luis Obispo",
        "Outter Space",
        "Rancho",
        "Cuttack",
       ],
    3:[
       "Papi",
       "Porra! caralho",
       "Mother Trucker",
       "Suup G?"],

    4:["He Doesn't",
       "Runs away",
       "Dances alone in his room", 
       "Singing in bathroom"],

    5:["If he is not coding, he is ded",
       "Probably coding somewhere else",
       "Hatchery (startup incubator on-campus)",
       "In the woods/creek"],

    6:["Pete Davidson",
       "John Mulaney", 
       "Dave Chappelle",
       "Jay Devkar"],

    7:[
       "Sleep is for weak",
       "3 Blocks of 2 hours", 
       "Non-Existent",
       "He works untill he passes out"],

    8:["CalorieFit",
       "Melofic",
       "Astra-Web",
       "J-Quiz"],
      
       9:["69 seconds",
       "12 hours",
       "He never roasts his roomates",
       "A day at max"],

       10:[
         "Very Sarcastic",
         "Hella Sarcastic",
         "Jay isn't sarcastic, sarcasm is Jay",
         "He a sweet soul",
       ],

       11:[
          "6 hours",
          "The question should be how many hours he doesn't code",
          "He codes at night",
          "He has a secret twin that codes for him",
       ],

       12:[
         "Full moon nights",
         "3 hours before the deadline",
         "No one knows",
         "Wait he goes to school?"
       ],
       13:[
         "Comedian",
         "Out on streets",
         "Musician",
         "Professional boxing"
       ]
}
for (const [key, value] of Object.entries(questions_lvl_3)) {
    // console.log(key,value)
    const q = new Question()
    q.level = level
    q.ask = value
    q.options = options[key]
    q.answers = answers[key]
    q.save().then((doc)=>console.log(`Question created : ${doc.ask}`))
}

