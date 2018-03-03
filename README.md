# Calling APP API
This is an API for calling application. Powered by Modular Magnetix
## Instructions

1. Clone the repo: `git clone https://github.com/steveunixson/calling.git`
2. Install packages: `npm install`
3. Change out the database configuration in config/database.js
4. Change out auth keys in config/auth.js
5. Launch: `node server.js`
6. Visit in your browser at: `http://localhost:8080`

## Wiki

API reference

GET /api/operator/
GET /api/operator/:id
POST /api/operator/

GET /api/comments/
POST /api/comments/

GET /api/numbers
GET /api/numbers:id
POST /api/numbers

POST /api/operator 

 name: { type: String, },
    age: { type: Number, min: 18, index: true },
    num: { type: Number, match: /[0-9]/ },
    bio: { type: String, },

POST /api/comments/
 
 comment: String,
    name: String,
    base: String

POST /api/numbers

age: { type: Number, min: 18, index: true },
    num: { type: Number, match: /[0-9]/ },
    bio: { type: String, },