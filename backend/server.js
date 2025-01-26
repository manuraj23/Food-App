const connectDB = require('./config/db');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const PROTO_PATH = path.join(__dirname, 'proto/questions.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const questionProto = grpc.loadPackageDefinition(packageDefinition).QuestionService;
const { searchQuestions } = require('./services/questionService');

const server = new grpc.Server();
server.addService(questionProto.service, { searchQuestions });

connectDB().then(() => {
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    console.log('Server running at http://localhost:50051');
    server.start();
});
