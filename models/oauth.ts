import {
    AuthAccessTokensRepository,
    ClientRepository,
} from "../database/class";
import 'reflect-metadata';
import {container} from '../app';
import {IOAuthClients} from "../database/schema";

export class Oauth{

    public async getClient(clientId: any, clientSecret: any) {
        const clientRepository = container.get(ClientRepository);
        const client: IOAuthClients| null = await clientRepository.findOne({"client.id":clientId, ...(clientSecret && {clientSecret})});

        if (!client) throw new Error("User not found ");
        return  client.client;
    }

    public async getUserFromClient(client:any) {
        return {};

    }

    public async getAccessToken(accessToken:string) {
        const authAccessTokensRepository = container.get(AuthAccessTokensRepository);
        const token = await authAccessTokensRepository.findOne({accessToken});
        if (!token) throw new Error("Access token not found");

        return token
    }

    public async verifyScope(token: any, scope: string): Promise<boolean> {
        if (!token.scope) {
            return false;
        }
        let requestedScopes = scope.split(' ');
        let authorizedScopes = token.scope.split(' ');
        return requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0);
    }


    public async saveToken(token: any, client: any, user: any) {
        const authAccessTokensRepository = container.get(AuthAccessTokensRepository);
        await authAccessTokensRepository.insert({
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: client,
            user: user
        });


        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: client,
            user: user,

        };
    }

}


