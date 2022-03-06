const grpc = require("@grpc/grpc-js");
require('dotenv').config();

const PROTO_PATH = __dirname+"/proto/user.proto";
var protoLoader = require("@grpc/proto-loader");
const users = require("./controllers/user");

require('./lib/mongo');
require('./lib/redis');
const port=process.env.PORT

const options = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    };
    var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
    const newsProto = grpc.loadPackageDefinition(packageDefinition);

    const server = new grpc.Server();
    

    server.addService(newsProto.UserServices.service, {
        GetAllUser: users.GetallUserData,
        AddUserData: users.AddUserData,
        DeleteUserData:users.DeleteUserData,
        GetUserByIdentifyNumber:users.GetUserByIdentifyNumber,
        EditUserData:users.UpdateUserData
    });

    server.bindAsync(
        process.env.SERVER_URL+port,
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
            console.log("Server running at "+port); //+port
            server.start();
        }
    )
