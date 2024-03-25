import { userId } from "../../src/index";

declare global{
    namespace Express {
        interface Request {
            currentUser: userId
        }
    }
}
