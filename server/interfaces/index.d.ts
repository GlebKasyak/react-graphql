import { IUserDocument } from "./UserInterfaces";

declare global {
    namespace Express {
        interface Request {
            user: IUserDocument,
            isAuth: boolean,
            token: string
        }
    }
}

export type DecodedDataType = {
    userId: string;
    iat: number;
}