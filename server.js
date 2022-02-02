const express = require('express')
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.json()); 

import { getUserList } from './user';
const userList = getUserList();

app.get('/users', (req, res) => {

    return res.status(200).send({
        success: 'true',
        message: 'users',
        users: userList
    })

});

app.listen(8000, () => {
    console.log('Port 8000')
});

app.post('/addUser', (req, res) => {
    if (req.body.name) {
        return res.status(400).send({
            success: "false",
            message: "name is required",
        });
    } else if (req.body.companies) {
        return res.status(400).send({
            succes: "false",
            message: "companies is required",
        });
    }
    const user = {
        id: userList.length + 1,
        isPublic: req.body.isPublic,
        name: req.body.name,
        companies: req.body.companies,
        books: req.body.books
    };

    userList.push(user); return res.status(201).send({
        success: "true",
        message: "user added succesfully",
        user,

    });
});
app.put('/updateUser/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log("id:",id)
    console.log("body",req.body)
    const updatedUser = {
        id: id,
        isPublic: req.body.isPublic,
        name: req.body.name,
        companies: req.body.companies,
        books: req.body.books,
    };
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === id) {
            userList[i] = updatedUser;
            return res.status(201).send({
                success: "true",
                message: "user added successfully",
                updatedUser
            });
        }
    }
    return res.status(404).send({
        success: "true",
        message: "error in update",
    });
})



