const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");

router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
    .populate("postedBy","_id name")
    .then(result => {
        res.status(200).json({
            message: "Success",
            data: result
        });
    })
    .catch(err => {
        res.status(400).json({
            message: err
        });
    })
});

router.post('/createpost', requireLogin, (req, res) => {
    const { title, body } = req.body
    if (!title || !body) {
        return res.status(422).json({error: "Please add all the fields"});
    }
    // console.log(req.user);
    // res.send("ok");
    req.user.password = undefined; //mengilangkan password dari respon json
    const post = new Post({
        title,
        body,
        postedBy: req.user
    });
    post.save().then(result => {
        res.status(200).json({
            post: result
        });
    }).catch(err => {
            console.log(err)
        });

})

router.get('/mypost', requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost => {
        res.status(200).json({
            message:"success",
            data: mypost
        });
    })
    .catch(err => {
        res.status(400).json({
            message:"error",
            error: err
        })
    })
})

module.exports = router;