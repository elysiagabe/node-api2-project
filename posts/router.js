const express = require('express');

const Data = require('../data/db');

const router = express.Router();

// ~~ ENDPOINTS ~~ //
// Create post (POST, /api/posts)




// Create comment (POST, /api/posts/:id/comments)




// Return all posts (GET, /api/posts)
router.get('/', (req, res) => {
    Data.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ 
            errorMessage: "The posts' information could not be retrieved." 
        })
    })
})

// Return specific post (GET, /api/posts/:id)
router.get('/:id', (req, res) => {
    Data.findById(req.params.id)
    .then(post => {
        if (post.length > 0) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ 
                errorMessage: "The post with the specified ID does not exist." 
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "The post information could not be retrieved."
        })
    })
})

// Return specific comment (GET, /api/posts/:id/comments)
router.get('/:id/comments', (req, res) => {
    let postID = req.params.id;
    Data.findById(postID)
    .then(post => {
        if (post.length > 0) {
            Data.findPostComments(postID)
            .then(comments => {
                if (comments.length > 0) {
                    res.status(200).json(comments)
                } 
                else {
                    res.status(404).json({
                        errorMessage: "There are no comments associated with the specified posts"
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: "The comments information could not be retrieved."
                })
            })
        } else {
            res.status(404).json({
                errorMessage: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "The comments information could not be retrieved."
        })
    })
})

// Delete specific post (DELETE, /api/posts/:id)




// Update specific post (PUT, /api/posts/:id)




// ~~ EXPORT ~~ //
module.exports = router;