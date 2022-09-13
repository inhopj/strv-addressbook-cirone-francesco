# strv-addressbook-cirone-francesco
Node + Express Address Book REST Api
## Features
- Stateless authentication (Registration and Login) with JWT valid for 1h, no Refresh Token.
- Users storing in cloud using MongoDB Atlas.
- Contacts storing in cloud using Cloud Firestore available at https://strv-addressbook-cirone-fra.firebaseio.com (each user has a dedicated collection of contacts with the collaction name matching the user email)
- Hosting provided by Heroku at this url https://strv-addressbook-cirone-fra.herokuapp.com/
- No CI/CD, just authomatic build and deploy at each push of the **main** branch
- Unit testing and APIs testing with Jest

## Folders structure

```sh
├── server.js                 (main)
├── package.json
├── config
│   ├── constants.js          (public constants)
│   └── databases             (databases connections/configurations)
│       ├── firestore.js
│       └── mongo.js
├── domains                   (1:1 with top level routes)
│   ├── auth
│   │   ├── controller.js     (http request/response related only)
│   │   ├── operations.js     (data-access, everything db-related)
│   │   ├── services.js       (business logic layer)
│   │   └── models            (db-entities)
│   │       └── user.js
│   └── contacts
│       ├── controller.js
│       ├── operations.js
│       └── services.js
├── routes                    (top level routes)
│   ├── auth.js
│   └── contacts.js
├── middlewares             
│   ├── auth-gate.js          (authenticated APIs protection)
│   └── error.js              (error handling)
├── helpers
│   ├── custom-error.js       (custom error class)
│   ├── schema-validator.js   (user input validation logic)
│   └── token.js              (token signing and verification)
└── tests
    ├── functional            (APIs functionalities testing)
    │   ├── auth.test.js      
    │   ├── contacts.test.js
    │   └── mongoDB.js        
    └── unit
        └── token.test.js     (unit testing token helper)
```

## Local Development
### Installation

```sh
npm ci
```
### Start Local server

```sh
npm run dev
```
### Testing
```sh
npm run test
```

## APIs

### Registration
```sh
REQ

Method: POST
Endpoint /auth/registration
Headers: 'Content-type': 'application/json'
Body: {
  email: {
    type: string,
    required: true,
    format: email,
    constraints: { lowercase }
  }
  password: {
    type: string,
    required: true, 
    constraints: { minimumLength: 10 }
  }
}

RESP

Type: JSON
StatusCode: 201
Body: {
  status: 'OK',
  data: {
    accessToken: 'aVeryLongSequenceOfApparentlyRandomStuff'
  }
}
```

### Login
```sh
REQ

Method: POST
Endpoint /auth/login
Headers: 'Content-type': 'application/json'
Body: {
  email: {
    type: string,
    required: true,
    format: email
  }
  password: {
    type: string,
    required: true,
  }
}

RESP

Type: JSON
StatusCode: 200
Body: {
  status: 'OK',
  data: {
    accessToken: 'aVeryLongSequenceOfApparentlyRandomStuff'
  }
}
```


### Contact addition
```sh
REQ

Method: POST
Endpoint /contacts/add
Headers: {
  'Content-type': 'application/json',
  'Authorization': 'Bearer aVeryLongSequenceOfApparentlyRandomStuff'
}
Body: {
  firstName: {
    type: 'string',
    required: true
  },
  lastName: {
    type: 'string',
    required: true 
  },
  phoneNumber: {
    type: 'string',
    required: true
  },
  address: {
    type: 'string',
    required: true
  },
  user: {
    type: 'string',
    required: true
  },
}

RESP

Type: JSON
StatusCode: 200
Body: {
  status: 'OK'
}
```