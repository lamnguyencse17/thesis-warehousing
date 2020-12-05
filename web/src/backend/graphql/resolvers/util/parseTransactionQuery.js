import { parseResolveInfo } from "graphql-parse-resolve-info";

export default (info) => {
	const parsedResolveInfoFragment = parseResolveInfo(info);
	const rootField = parsedResolveInfoFragment.fieldsByTypeName.Transaction;
	//* This should be changed based on Schema
	let populateInfo = { receiver: "", sender: "", assets: "" };
	Object.keys(rootField).forEach((root) => {
		if (root === "_id") {
			return;
		}
		//* targetFields is an unknown field that is based on Schema.
		//* fieldsByTypeName has only 1 key which is the Schema name so just ram in with [0] is good enough
		const key = Object.keys(rootField[root].fieldsByTypeName)[0];
		const targetFields = rootField[root].fieldsByTypeName[key];
		Object.keys(targetFields).forEach((field) => {
			if (field === "_id") {
				return;
			}
			//* this weird string format is Mongoose populate string
			if (populateInfo[root].length === 0) {
				populateInfo[root] += field;
				return;
			}
			populateInfo[root] += ` ${field}`;
		});
	});
	return populateInfo;
};
