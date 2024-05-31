import { question } from 'readline-sync';
import {container,initServices} from '../app';
import {MongoDb} from "../database/mongoDb";
import {ClientRepository} from "../database/class";
import {IOAuthClients} from "../database/schema";



initServices();
const dbClient =  container.get(MongoDb)
dbClient.createCollection();

const clientId =makeid(16);
const clientSecret = makeid(16);



container.get(ClientRepository).insert({
        client: {
            id: clientId,
            grants: ["client_credentials"],
        },
        clientSecret: clientSecret
});

console.log("successful");


function makeid(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}



