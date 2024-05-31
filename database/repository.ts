/* eslint-disable no-param-reassign */
import { Collection, Filter, FindOptions, ObjectId } from 'mongodb';
import { MongoDb } from './mongoDb';

export abstract class AbstractRepository<T> {

    public collection: Collection;

    public constructor(client: MongoDb, collectionName: string) {
        this.collection = client.getCollection(collectionName);
    }

    public async findOne(query: Filter<unknown>, options: FindOptions = {}): Promise<T | null> {
        return this.resultOrNull(
            this.collection.findOne(query, options),
        );
    }
    public async deleteOne(filter: Filter<unknown>): Promise<boolean> {
        await this.collection.deleteOne(filter);
        return true;
    }

    public async insert(document: any ): Promise<T> {
        const result = await this.collection.insertOne(document);

        return document;
    }


    /*
        Helper methods for object management
     */

    protected ensureObjectId(id: ObjectId | string): ObjectId {
        if (typeof id === 'string') {
            return new ObjectId(id);
        }

        return id;
    }

    protected remapId(data: Record<string, unknown>): object {
        if ('id' in data) {
            data._id = this.ensureObjectId(data.id as ObjectId | string);
            delete data.id;
        }

        return data;
    }

    protected async resultOrNull(result: unknown): Promise<T | null> {
        const data = (await result) as Record<string, unknown> | null;
        if (data) {


            return data as T;
        }

        return null;
    }

}