
const user = require("../models/user");
const client = require("./../lib/redis");

const GetallUserData = async (call, callback) => {
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

    callback(null, { user: data });
    } catch (error) {
        console.log(error)
        callback(error, { user: [] });
    }
}

const AddUserData = async (call, callback) => {
    try {
    const dataRequest = call.request;
    const userObj = new user(dataRequest);
    await userObj.save();
    RefreshRedis();
    callback(null, { dataRequest });
    } catch (error) {
        // console.log(error);
        callback(error, { user: {} });

    }
}
const DeleteUserData = async (call, callback) => {
    try {
    const { id } = call.request;
    RefreshRedis()
    user.findByIdAndRemove(id, (err, doc) => {
        
        if (!err) {
            console.log(err);
        }
        callback(null, {
            status:true
        });
    });
    
    } catch (error) {
        callback(null, { status:false });
    }
}
const UpdateUserData = async (call, callback) => {
    try {

    const dataRequest = call.request;
    RefreshRedis()
    const data = await user.findOneAndUpdate({ id: dataRequest.id }, dataRequest, { new: true }).exec();
    callback(null, {
        status:true
    });    
    } catch (error) {
        callback(null, { status:false });
    }
}
const GetUserByIdentifyNumber = async (call, callback) => {
    try {
        const dataRequest = call.request;
        
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

    callback(null, {
        user:data
    });    
    } catch (error) {
        callback(null, { status:false });
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