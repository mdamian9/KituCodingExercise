# KituCodingExercise
* API in Node.js/Express exposing 4 endpoints to GET and POST random user data. 
* It makes asynchronous requests to retrieve our data initially from a 3rd party API ("https://randomuser.me/api").

### Used the following:
* Express.js  
* axios module to make requests  
* morgan module to log requests to console   
* body-parser module to parse incoming request bodies  

#### GET '/users'
*  When this endpoint receives a request from the client, 10 asynchronous requests are made to "https://randomuser.me/api", retrieving 10 different user records. These records are stored in memory. Every time after this endpoint recieves a request, 10 NEW user records are stored in memory in the format above.

* Raw user data retrieved from "https://randomuser.me/api" is stored in memory as shown below:
    * {
        &ensp; gender: 'foo',
        &ensp; firstname: 'bar',
        &ensp; city: 'baz',
        &ensp; email: 'barfoo',
        &ensp; cell: 'bazbar'
    }

#### GET '/users-2'
*  When this endpoint receives a request from the client, 1 asynchronous request is made to "https://randomuser.me/api/?results=10", retrieving 10 different user records. These records are stored in memory. Every time after this endpoint recieves a request, 10 NEW user records are stored in memory.

#### POST '/users'
* When this endpoint receives a request from the client, it constructs a new user object in the format above using the data from the body of the request. User data posted is stored in memory and be visible by GET endpoints. 

#### GET '/users/firstname/:firstname'
* When this endpoint receives a request from the client, it filters through the users array and finds user by ':firstname' value. If user is found, a response is sent to the client with the user record in JSON format with status code 200. If user is not found, the following { message: 'User not found! '} JSON response with status code 404 is sent back to the client.
