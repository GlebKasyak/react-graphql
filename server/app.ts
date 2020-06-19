import express, { Application, json } from "express";
import graphqlHTTP from "express-graphql";

import connectToDB from "./db";
import { auth } from "./middleware";

import schemas from "./graphQLSchemas";
import resolves from "./graphQLResolves";

const app: Application = express();
app.use(json());
app.use(auth)

connectToDB(app);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if(req.method === "OPTIONS") {
        return res.sendStatus(200)
    };

    next();
});

app.use("/graphql", graphqlHTTP({
    schema: schemas,
    rootValue: resolves,
    graphiql: true
}));
