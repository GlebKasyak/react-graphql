import { Application } from "express";
import { connect, connection, connections } from "mongoose";

import config from "./config";

export default async (app: Application) => {
    try {
        await connect(config.MONGODB_URL, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        await connection.on("open", () => {
            const info = connections[0];
            console.log(`Connected to:
         host: ${ info.host },
         port: ${ info.port },
         name: ${ info.name }`
            )
        });

        app.listen(config.PORT,() => {
            console.log(`Server up on ${ config.PORT }`);
        });
    } catch (err) {
        console.log(err);
    }
};
//