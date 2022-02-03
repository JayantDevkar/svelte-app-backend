[![BACKEND CI](https://github.com/JayantDevkar/svelte-app-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/JayantDevkar/svelte-app-backend/actions/workflows/node.js.yml)
# J-Quiz API

## Front-End 
https://github.com/JayantDevkar/Quiz-App
## Routes
- Set User : "/api/set/user" (GET) => query : {uuid , name }
- Get Quiz : "/api/get/questions" (GET) => query : {uuid,level, number} // level/number -> level/number of questions
- Submit Quiz : "/api/submit/quiz" (GET) => query : {answer Obj}
- Get Leader Board : "/api/get/leader/board" (GET)

## CI 
- Implemented using Github Actions. 
- to run test: `npm test`

## Prod-link (Hosted on Heroku)
https://whispering-tor-80065.herokuapp.com/
