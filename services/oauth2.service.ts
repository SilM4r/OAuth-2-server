// services/oauth2.service.js

import OAuth2Server, {Client, Request, Response} from "oauth2-server";
import 'reflect-metadata';
import {Oauth} from '../models/oauth';


const oauth = new Oauth();

const model = {
    getAccessToken: oauth.getAccessToken,
    getClient: oauth.getClient,
    saveToken: oauth.saveToken,
    verifyScope:oauth.verifyScope,
    getUserFromClient: oauth.getUserFromClient

};

const server = new OAuth2Server( {model: model // See https://github.com/oauthjs/node-oauth2-server for specification
});


export const token = async (req:any, res:any, next:any) => {
    const request = new Request(req);
    const response = new Response(res);
    try {
        const result = await server
            .token(request, response);
        res.json({
            accessToken:result.accessToken,

        });
    } catch (err: any) {
        console.log("err", err);
        res.status(err.code || 500).json(err instanceof Error ? {error: err.message} : err);
    }
};
