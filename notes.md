# Thins I have learnt along the way

## CORS (cross origin resource sharing)

The precursor to this was, **_Same-Origin_** policy. Meaning that say something like script was only allowed to make calls with in the same sub(domain) that it originated from.

CORS is a mechanism that gives you the ability to alter the Same-Origin behavior, allowing restricted resources to be accessed from another domain.

This is achieved through the "**_OPTIONS_**" request, which is a preflight request that exchange a set of HTTP **_Request_** headers and corresponding **_Response_** headers, aka CORS Headers.

e.g;

## Security Related issues with CORS
issues with accessing information from one domain to another.

How to solve, use a node library such as:
1. `npm i cors`
2. `const cors = require("cors")`
3. ```
`app.use(cors({
        origin: "http://127.0.0.1:5500", // Port to Port
        methods: ['GET', 'Post'], // set the https method allowed
        credentials: true, // set access control credentials

})`