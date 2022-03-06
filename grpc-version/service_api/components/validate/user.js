const Joi = require('joi');
// const utilities = require('/utilities');
const RequestValidatorUtility = require('./RequestValidatorUtility');
const ValidateLogin = new RequestValidatorUtility(
    Joi.object({
        email: Joi.string().email(),
        username: Joi.string().required(),
    })
        .unknown()
    );

    module.exports = {
        ValidateLogin
    };