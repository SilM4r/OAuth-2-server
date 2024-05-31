import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import createError from 'http-errors';
import {MongoDb} from "./database/mongoDb";



import userRouter from './routes/user';
import authorizationRouter from './routes/authorization';
import statusRouter from './routes/status';
import {Container} from "./DI/Container";
import {
    AuthAccessTokensRepository,
    ClientRepository,
} from "./database/class";





const app: Express = express();
const container = new Container()


// view engine setup
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', statusRouter);
app.use('/info', userRouter);
app.use('/login', authorizationRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status( 500);
    res.json({ err: err.name,
                    err_code: err.message });
});


function initServices(){
    container.set(new MongoDb("mongodb://127.0.0.1:27017"));
    container.set(new ClientRepository(container.get(MongoDb), "OAuthClients"));
    container.set(new AuthAccessTokensRepository(container.get(MongoDb),"OAuthAccessTokens"));
}

export {app,container,initServices}