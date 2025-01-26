const grpc = require('grpc');
const { Question } = require('../models/Question');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const PROTO_PATH = path.join(__dirname, '../proto/questions.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const questionProto = grpc.loadPackageDefinition(packageDefinition).QuestionService;

const searchQuestions = async (call, callback) => {
    try {
        const query = call.request.query;
        const results = await Question.find({ title: { $regex: query, $options: 'i' } });

        const questions = results.map((question) => ({
            title: question.title,
            type: question.type,
            content: question.content,
            options: question.options,
        }));

        callback(null, { questions });
    } catch (error) {
        callback(error);
    }
};

const server = new grpc.Server();
server.addService(questionProto.service, { searchQuestions });
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

console.log('Server running at http://localhost:50051');
server.start();
