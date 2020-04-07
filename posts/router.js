const express = require('express');

const Data = require('../data/db');

const router = express.Router();

const error404 = { errorMessage: "The post with the specified ID does not exist."}

// ~~ ENDPOINTS ~~ //
// Create post (POST, /api/posts)
router.post('/', (req, res) => {
    Data.insert(req.body)
    .then(postObj => {
        let newPost = {...postObj, ...req.body}
        if (!newPost.title || !newPost.contents) {
            res.status(400).json({
                errorMessage: "Please provide both a title and contents for the post."
            })
        } else {
            res.status(201).json(newPost)
        }
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "There was an error while saving the post to the database."
        })
    })
})

// Create comment (POST, /api/posts/:id/comments)
router.post('/:id/comments', (req, res) => {
    let postID = Number(req.params.id);
    // let commentText = req.body;
    Data.findById(postID)
    .then(post => {
        if (post.length > 0) {
            Data.insertComment(req.body)
            .then(commentObj => {
                let newComment = {...commentObj, ...req.body}
                if (!newComment.text) {
                    res.status(400).json({
                        errorMessage: "Please provide text for the comment."
                    })
                } else {
                    res.status(201).json(newComment)
                }
            })
            .catch(err => {
                console.log("Error 2", {postID}, {commentText})
                res.status(500).json({
                    errorMessage: "There was an error while saving the comment to the database."
                })
            })
        } else {
            res.status(404).json(error404)
        }
    })
    .catch(err => {
        console.log("Error 1")
        res.status(500).json({
            errorMessage: "There was an error while saving the comment to the database."
        })
    })
})

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
            res.status(404).json(error404)
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
            res.status(404).json(error404)
        }
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "The comments information could not be retrieved."
        })
    })
})

// Delete specific post (DELETE, /api/posts/:id)
router.delete('/:id', (req, res) => {
    Data.remove(postID)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "The post has been removed."})
        } else {
            res.status(404).json(error404)
        }
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "The post could not be removed."
        })
    })
})



// Update specific post (PUT, /api/posts/:id)




// ~~ EXPORT ~~ //
module.exports = router;