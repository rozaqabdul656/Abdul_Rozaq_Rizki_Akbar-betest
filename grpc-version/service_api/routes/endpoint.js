// API endpoints
const express = require('express')
const user = require('../components/controllers/user');
const jwt = require('../components/middleware/jwt');


const apiEndpoints = (app) => {
    app.use(express.json())
    app.post('/login', user.login_user);
    app.get('/getdatauser',jwt.checkCredentials,user.GetAllDataUser)
    app.post("/adddatauser",jwt.checkCredentials,user.AddUserData)
    app.post("/deleteuser",jwt.checkCredentials,user.DeleteUserData)
    app.post("/editdatausers",jwt.checkCredentials,user.EditUserData)
    app.post("/getbyidentify-number",jwt.checkCredentials,user.GetUserByIdenitfyNumber)
    
}    

module.exports = apiEndpoints;
