import { Collection, MongoClient } from 'mongodb';
import {IOAuthAccessTokens, IOAuthClients} from "./schema";



export class MongoDb {

    public client: MongoClient;

    public constructor(dsn: string) {
        this.client = new MongoClient(dsn);
        this.client.connect().then();
    }

    public async disconnect(): Promise<void> {
        return this.client.close()
    }

    public getCollection(collection: string): Collection {
        return this.client.db().collection(collection);
    }

    public async createCollection(){
        await this.client.db().createCollection<IOAuthClients>("OAuthClients");
        await this.client.db().createCollection<IOAuthAccessTokens>("OAuthAccessTokens")
    }

}