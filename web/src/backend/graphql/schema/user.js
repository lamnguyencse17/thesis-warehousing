import userModel, {userTC} from "../../models/users";

const UserQuery = {
    userById: userTC.getResolver("findById"),
    userByIds: userTC.getResolver("findByIds"),
    userOne: userTC.getResolver("findOne"),
    userMany: userTC.getResolver("findMany"),
    userConnection: userTC.getResolver("connection"),
    userPagination: userTC.getResolver("pagination")
};

const UserMutation = {
    userCreateOne: userTC.getResolver('createOne'),
    userCreateMany: userTC.getResolver('createMany'),
    userUpdateById: userTC.getResolver('updateById'),
    userUpdateOne: userTC.getResolver('updateOne'),
    userUpdateMany: userTC.getResolver('updateMany'),
    userRemoveById: userTC.getResolver('removeById'),
    userRemoveOne: userTC.getResolver('removeOne'),
    userRemoveMany: userTC.getResolver('removeMany'),
};

export { UserQuery, UserMutation };