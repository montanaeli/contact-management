export {}
declare global {
    namespace Express {
        export interface Request {
            currentUser: string
        }
    }
}
