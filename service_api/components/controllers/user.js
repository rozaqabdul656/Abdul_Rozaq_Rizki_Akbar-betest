const { sendSuccessResponse,sendErrorResponse } = require('../response_service');
const { ValidateLogin } = require('../validate/user');
const { generateToken,MakeTokens } = require('../middleware/jwt');
const helperCurl = require('../helper/curl');

/**
 * Login and authenticate player
 * @param {Object} postData
 * @param {Function} callback
 */
 const errorTemplate={ status : 500, message: "Internal server Error", error:  null };
const login_user = async (req, res) => {
    try {
        const {token,expired_at} = await MakeTokens();
                sendSuccessResponse(req, res, {
                    messages:"Login Sukses",
                    token,
                    expired_at
                    });

        } catch (error) {
            sendErrorResponse(req, res, error);
        }
    };

    const GetAllDataUser = async (req, res) => {
        try {
            let response_value=await helperCurl.Curl({},"get","/getalldatauser")
                sendSuccessResponse(req, res, {
                    data:response_value.data,
                    messages:"Get All Data User Sukses",
                    });


            } catch (error) {
                sendErrorResponse(req, res, error);
            }
        };
        const AddUserData = async (req, res) => {
            const {
                body: { email, username,accountNumber,identify_number},
            } = req;
            try {
            let response_value=await helperCurl.Curl({           
                                userName:username,
                                emailAddress:email,
                                identityNumber:identify_number,
                                accountNumber
                            },"post","/insertdata-user")
                    if (response_value.status != 200) {

                        sendErrorResponse(req,res,errorTemplate);
                        return;
                    }
                    sendSuccessResponse(req, res, {
                        messages:"Insert Data Sukses ! ",
                        });
                    
                } catch (error) {
                    sendErrorResponse(req, res, error);
                }
            };
        const DeleteUserData = async (req, res,next) => {
                const {
                    body: {id},
                } = req;
                try {
                        let response_value=await helperCurl.Curl({id},"POST","/delete-data-user")
                        if (response_value.status != 200) {
                            sendErrorResponse(req,res,errorTemplate);
                            return;
                        }

                        sendSuccessResponse(req, res, {
                            messages:"Delete Data Sukses ! ",
                            });
        
                    } catch (error) {
                        sendErrorResponse(req, res, error);
                    }
                };
        const EditUserData = async (req, res) => {
                    const {
                        body: { email, username,accountNumber,identify_number,id},
                    } = req;
                    try {
                        let response_value=await helperCurl.Curl({           
                            userName:username,
                            emailAddress:email,
                            identityNumber:identify_number,
                            id,
                            accountNumber,
                        },"POST","/update-data-user")
                        if (response_value.status != 200) {
                            sendErrorResponse(req,res,errorTemplate);
                            return;
                        }
                            sendSuccessResponse(req, res, {
                                messages:"Update Data Sukses ! ",
                                });
            
                        } catch (error) {
                            sendErrorResponse(req, res, error);
                        }
                    };
            const GetUserByIdenitfyNumber = async (req, res) => {
                        const {
                            body: { identify_number},
                        } = req;
                        try {
                            let response_value=await helperCurl.Curl({identityNumber:identify_number},"POST","/get-data-by-identifynumber")
                            if (response_value.status != 200) {

                                sendErrorResponse(req,res,errorTemplate);
                                return;
                            }
                                sendSuccessResponse(req, res, {
                                    data:response_value.data,
                                    messages:"Get  Data Sukses ! ",
                                    });
                
                            } catch (error) {
                                sendErrorResponse(req, res, error);
                            }
                        };
    module.exports = {
        AddUserData,
        GetUserByIdenitfyNumber,
        login_user,
        EditUserData,
        DeleteUserData,
        GetAllDataUser
    }