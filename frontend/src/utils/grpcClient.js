import { GrpcWebClientBase } from 'grpc-web';
import { SearchRequest } from '../generated/questions_pb';
import { QuestionServiceClient } from '../generated/QuestionServiceClientPb';

const client = new QuestionServiceClient('http://localhost:50051', null, null); // Update the endpoint as needed

export const searchQuestions = (query) => {
    return new Promise((resolve, reject) => {
        const request = new SearchRequest();
        request.setQuery(query);

        client.searchQuestions(request, {}, (error, response) => {
            if (error) reject(error);
            resolve(response.getQuestionsList());
        });
    });
};
