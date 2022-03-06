require('dotenv').config();
const { sendSuccessResponse,sendErrorResponse } = require('../controllers/response_service');


const checkCredentialsinternalService = async (req, res, next) => {
    let Erores={ status : 401, message: "Unauthorized", error:  null };

    try {
        const x_api_key = req.get('x-api-key');

        if(process.env.X_API_KEY != x_api_key ){
            throw {
                'status': 400,
                'message': "Un authorized Invalid API KEY !!",
                'error': 'ER_VALIDATION_FAILED',
            };
        }
        next();
    } catch (errors) {
        sendErrorResponse(req, res, Erores);
    }
};

module.exports = {
    checkCredentialsinternalService,
}