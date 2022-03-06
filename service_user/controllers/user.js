
const user = require("../models/user");
const client = require("./../lib/redis");
const { sendSuccessResponse,sendErrorResponse } = require('./response_service');


const GetallUserData =async (req, res) => {
    try {
        let data=await client.get("all_user_data")
        data=JSON.parse(data);
        if (data == null){
            console.log("Not avalible in redis")
            data = await user.find().sort({ id: 'asc' }).exec();

            let datajson=JSON.stringify(data)
            client.set('all_user_data', datajson, (err, rr) => {
                if (err) {
                    console.log("err",err)
                }
                console.log(rr);
            });
        }
    sendSuccessResponse(req, res, {
            messages:"Get Data Sukses",
            data
            });
        return
    } catch (error) {
        sendErrorResponse(req, res, error);
    }
}

const AddUserData =async (req, res) => {
    try {

    const dataRequest = req.body;
    const userObj = new user(dataRequest);
    await userObj.save();
    RefreshRedis();
    sendSuccessResponse(req, res, {
        messages:"Add Data Sukses"
        });
        return
    } catch (error) {
        sendErrorResponse(req, res, error);
    }
}
const DeleteUserData =  async (req, res) => {
    try {
        const {
            body: { id},
        } = req;
        RefreshRedis()
        user.findByIdAndRemove(id, (err, doc) => {
        
            if (!err) {
                console.log(err);
            }
            sendSuccessResponse(req, res, {
                messages:"Delete Data Sukses"
                });
        });
        return
    } catch (error) {
        sendErrorResponse(req, res, error);
    
    }
}
const UpdateUserData =  async (req, res) => {
    try {
    const dataRequest = req.body;
    RefreshRedis()
    await user.updateOne({ _id: dataRequest.id }, dataRequest, ).exec();
    sendSuccessResponse(req, res, {
        messages:"Update Data Sukses"
        });
        return
    } catch (error) {
        sendErrorResponse(req, res, error);
    
    }
}
const GetUserByIdentifyNumber =  async (req, res) => {
    try {
        const dataRequest = req.body;

        let data=await client.get("all_user_data_identify_number")
        data=JSON.parse(data);
        if (data == null){
            console.log("Not avalible in redis")
            data = await user.find({ identityNumber: dataRequest.identityNumber }).exec();
            let datajson=JSON.stringify(data)
            client.set('all_user_data_identify_number'+dataRequest.identityNumber, datajson, (err, rr) => {
                if (err) {
                    console.log("err",err)
                }
                console.log(rr);
            });
        }


    sendSuccessResponse(req, res, {
        messages:"Get Data Sukses",
        data
        });
        return
    } catch (error) {
        console.log("errr",error)
        sendErrorResponse(req, res, error);
    }
}

    const RefreshRedis = async () => {
        await client.sendCommand(['flushall']); // 'OK'       
    }

module.exports = {
    UpdateUserData,
    GetUserByIdentifyNumber,
    DeleteUserData,
    GetallUserData,
    AddUserData
};