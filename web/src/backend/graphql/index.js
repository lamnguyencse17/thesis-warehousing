import { SchemaComposer } from "graphql-compose";
import { AssetQuery, AssetMutation } from "./schema/asset";
import { UserQuery, UserMutation } from "./schema/user";
import { TransactionQuery, TransactionMutation } from "./schema/transaction";

import mongoose from "mongoose";
const db = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
    ...UserQuery,
    ...AssetQuery,
    ...TransactionQuery
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...AssetMutation,
    ...TransactionMutation
});

export default schemaComposer.buildSchema();