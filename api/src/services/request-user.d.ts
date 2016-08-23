declare namespace Express {
    export interface Request {
        user?: {signedIn: boolean}
    }
}