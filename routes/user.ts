import OAuthServer from "express-oauth-server";
import {Oauth} from "../models/oauth";
import 'reflect-metadata';
const router = require('express').Router();


const oauth = new Oauth();

const model = {
    getAccessToken: oauth.getAccessToken,
    getClient: oauth.getClient,
    saveToken: oauth.saveToken,
    verifyScope:oauth.verifyScope,
    getUserFromClient: oauth.getUserFromClient

};

let server = new OAuthServer({
    model: model,
    useErrorHandler: true,
});
router.use('/', server.authenticate(), (req:any, res:any) => {
    return res.json({
        oauth:{
            token:{
                _id:res.locals.oauth.token._id,
                accessToken:res.locals.oauth.token.accessToken,
                accessTokenExpiresAt:res.locals.oauth.token.accessTokenExpiresAt,
                client: res.locals.oauth.token.client
            }}

    })
});

export default router;