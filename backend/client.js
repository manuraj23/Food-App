const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load Proto
const PROTO_PATH = './proto/messages.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).GreetingService;

// Create Client
const client = new proto.GreetingService('localhost:50051', grpc.credentials.createInsecure());

// Send Message
const sendMessage = (message) => {
    client.SendMessage({ message }, (err, response) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Response:', response.reply);
        }
    });
};

// Test
sendMessage('Hello'); // Should reply "Hai"
sendMessage('Day');   // Should reply "Sunday" (fetched from MongoDB)
