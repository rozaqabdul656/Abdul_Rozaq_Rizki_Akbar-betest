const { sendSuccessResponse,sendErrorResponse } = require('../response_service');
const client = require("./grpc_client");
const { ValidateLogin } = require('../validate/user');
const { generateToken,MakeTokens } = require('../middleware/jwt');

/**
 * Login and authenticate player
 * @param {Object} postData
 * @param {Function} callback
 */
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
            client.GetAllUser({}, (error, response) => {
                console.log(error);
                if (error != null) {
                    let errorsGrpc={ status : 500, message: "Internal server Error", error:  null };
                        sendErrorResponse(req,res,errorsGrpc);
                        return;
                }
                sendSuccessResponse(req, res, {
                    data:response,
                    messages:"Get All Data User Sukses",
                    });
                })

            } catch (error) {
                sendErrorResponse(req, res, error);
            }
        };
        const AddUserData = async (req, res) => {
            const {
                body: { email, username,accountNumber,identify_number},
            } = req;
            try {

            client.AddUserData({           
                    userName:username,
                    emailAddress:email,
                    identityNumber:identify_number,
                    accountNumber
                
            }, (error, response) => {
                console.log(error)
                    if (error != null) {
                        let errorsGrpc={ status : 500, message: "Internal server Error", error:  null };
                        sendErrorResponse(req,res,errorsGrpc);
                        return;
                    }
                    sendSuccessResponse(req, res, {
                        messages:"Insert Data Sukses ! ",
                        });
                    })
    
                } catch (error) {
                    sendErrorResponse(req, res, error);
                }
            };
        const DeleteUserData = async (req, res,next) => {
                const {
                    body: {id},
                } = req;
                try {
    
                client.DeleteUserData({           
                        id
                    
                }, (error, response) => {
                    console.log(error);
                        if (error != null) {
                            let errorsGrpc={ status : 500, message: "Internal server Error", error:  null };
                            sendErrorResponse(req,res,errorsGrpc);
                            return;
                        }

                        sendSuccessResponse(req, res, {
                            messages:"Delete Data Sukses ! ",
                            });
                        })
        
                    } catch (error) {
                        sendErrorResponse(req, res, error);
                    }
                };
        const EditUserData = async (req, res) => {
                    const {
                        body: { email, username,accountNumber,identify_number,id},
                    } = req;
                    try {
                    client.EditUserData({           
                            id,
                            userName:username,
                            emailAddress:email,
                            identityNumber:identify_number,
                            accountNumber
                        
                    }, (error, response) => {
                            if (error != null) {
                                let errorsGrpc={ status : 500, message: "Internal server Error", error:  null };
                                sendErrorResponse(req,res,errorsGrpc);
                                return;
                            }
                            sendSuccessResponse(req, res, {
                                messages:"Update Data Sukses ! ",
                                });
                            })
            
                        } catch (error) {
                            sendErrorResponse(req, res, error);
                        }
                    };
            const GetUserByIdenitfyNumber = async (req, res) => {
                        const {
                            body: { identify_number},
                        } = req;
                        try {
                        client.GetUserByIdentifyNumber({           
                                identityNumber:identify_number,
                        }, (error, response) => {
                                if (error != null) {
                                    let errorsGrpc={ status : 500, message: "Internal server Error", error:  null };
                                    sendErrorResponse(req,res,errorsGrpc);
                                    return;
                                }
                                sendSuccessResponse(req, res, {
                                    data:response,
                                    messages:"Get  Data Sukses ! ",
                                    });
                                })
                
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