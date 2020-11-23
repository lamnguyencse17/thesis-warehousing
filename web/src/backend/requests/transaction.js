import axios from "axios";

export const createTransactionRequest = async ({IDs, newOwner}) => {
    const url = `${process.env.LEDGER_SERVER}/transfer`;
    try {
        const result = await axios.post(url, {IDs, newOwner});
        // This is temp work because Ledger always return code 200
        if (result.data.message != "Success"){
            return {status: false, message: "Transfer Failed" };
        }
        return {status: true};
    }
    catch (err){
        return {
            status: false,
            errCode: err.response.status,
            message: err.response.data.message,
        };
    }
};