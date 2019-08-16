const express = require('express');

const Data = require('./data/db');

const server = express();

server.get('/api/posts', (req, res) => {
    Data.find(req.query)
        .then(data => {
            res.status(200).json(data)
        })
})

server.get('/api/posts/:id', (req, res) => {
    Data.findById(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Data not found.'})
            }
        })
})

server.get('/api/posts/:id/comments', (req, res) => {
    Data.findPostComments(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
})

server.post('/api/posts', (req, res) => {
    // Data.insert(req.body)
    //     .then(data => {
    //         res.status(201).json(data)
    //     })
    console.log(req)
})

server.post('/api/posts/:id/comments', (req, res) => {
    const changes = {
        post_id: req.params.id,
        ...req.body
    }
    console.log(req.body)
    Data.insertComment(changes)
        .then(data => {
            res.status(201).json(data)
        })
})

server.put('/api/posts/:id', (req, res) => {
    const changes = req.body;
    Data.update(req.params.id, changes)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Post could not be found.'})
            }
        })
})

server.delete('/api/posts/:id', (req, res) => {
    Data.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The post has been removed.'})
            } else {
                res.status(404).json({ message: 'Post could not be found.'})
            }
        })
})

server.listen(8000, () => {
    console.log('\n*** Server running on http://localhost:8000 ***\n')
})