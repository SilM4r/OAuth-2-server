
const router = require('express').Router();
import { token} from "../services/oauth2.service";


router.post("/token", token);


export default router;