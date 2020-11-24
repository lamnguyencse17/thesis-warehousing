import transactionModel, {transactionTC} from "../../models/transactions";

const TransactionQuery = {
    transactionById: transactionTC.getResolver("findById"),
    transactionByIds: transactionTC.getResolver("findByIds"),
    transactionOne: transactionTC.getResolver("findOne"),
    transactionMany: transactionTC.getResolver("findMany"),
    transactionConnection: transactionTC.getResolver("connection"),
    transactionPagination: transactionTC.getResolver("pagination")
};

const TransactionMutation = {
    transactionCreateOne: transactionTC.getResolver('createOne'),
    transactionCreateMany: transactionTC.getResolver('createMany'),
    transactionUpdateById: transactionTC.getResolver('updateById'),
    transactionUpdateOne: transactionTC.getResolver('updateOne'),
    transactionUpdateMany: transactionTC.getResolver('updateMany'),
    transactionRemoveById: transactionTC.getResolver('removeById'),
    transactionRemoveOne: transactionTC.getResolver('removeOne'),
    transactionRemoveMany: transactionTC.getResolver('removeMany'),
};

export { TransactionQuery, TransactionMutation };