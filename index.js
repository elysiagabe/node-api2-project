const express = require('express');

//import router
const postRouter = require('./posts/router');

const server = express();

server.use(express.json());

// use postRouter
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send(`Hello.`)
})

const port = 4000;
server.listen(port, () => {
    console.log(`\n *** Server running on port ${port} *** \n`);
})