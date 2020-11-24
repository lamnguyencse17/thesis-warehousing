import assetModel, {assetTC} from "../../models/assets";

const AssetQuery = {
    assetById: assetTC.getResolver("findById"),
    assetByIds: assetTC.getResolver("findByIds"),
    assetOne: assetTC.getResolver("findOne"),
    assetMany: assetTC.getResolver("findMany"),
    assetConnection: assetTC.getResolver("connection"),
    assetPagination: assetTC.getResolver("pagination")
};

const AssetMutation = {
    assetCreateOne: assetTC.getResolver('createOne'),
    assetCreateMany: assetTC.getResolver('createMany'),
    assetUpdateById: assetTC.getResolver('updateById'),
    assetUpdateOne: assetTC.getResolver('updateOne'),
    assetUpdateMany: assetTC.getResolver('updateMany'),
    assetRemoveById: assetTC.getResolver('removeById'),
    assetRemoveOne: assetTC.getResolver('removeOne'),
    assetRemoveMany: assetTC.getResolver('removeMany'),
};

export { AssetQuery, AssetMutation };