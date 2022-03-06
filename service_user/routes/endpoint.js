// API endpoints
const express = require('express')
const user = require('../controllers/user');
const auth = require('../middleware/auth');


const apiEndpoints = (app) => {
    app.use(express.json())
    app.get('/getalldatauser',auth.checkCredentialsinternalService,user.GetallUserData)
    app.post("/insertdata-user",auth.checkCredentialsinternalService,user.AddUserData)
    app.post("/update-data-user",auth.checkCredentialsinternalService,user.UpdateUserData)
    app.post("/delete-data-user",auth.checkCredentialsinternalService,user.DeleteUserData)
    app.post("/get-data-by-identifynumber",auth.checkCredentialsinternalService,user.GetUserByIdentifyNumber)
    
}    

module.exports = apiEndpoints;
