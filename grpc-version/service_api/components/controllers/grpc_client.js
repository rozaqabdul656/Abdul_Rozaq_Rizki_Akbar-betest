
const grpc = require("@grpc/grpc-js");
const { dirname } = require('path');
var protoLoader = require("@grpc/proto-loader");
const appDir = dirname(require.main.filename);
const PROTO_PATH = appDir+"/proto/user.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    };

    var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

    const UserServices = grpc.loadPackageDefinition(packageDefinition).UserServices;
        
    const client = new UserServices(

        process.env.GRPC_CLIENT,
        grpc.credentials.createInsecure()
    );

    module.exports = client;
