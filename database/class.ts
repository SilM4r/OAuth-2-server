import {AbstractRepository} from "./repository"
import {
    IOAuthAccessTokens,
    IOAuthClients,
} from "./schema";



export class ClientRepository extends AbstractRepository<IOAuthClients> {

}

export class AuthAccessTokensRepository extends AbstractRepository<IOAuthAccessTokens> {

}
