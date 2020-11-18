import axios from "axios"

export const getTransactionRequest = (transactionId) => {
    // use process.env in the feature for BACKEND_API please!
    const requestUrl = `http://localhost:3000/api/transactions/${transactionId}`
// format: {
//     "_id": "5fb412288173b602387d876a",
//     "assets": [
//         {
//             "_id": "5fb392d6dab9670184275ece",
//             "name": "Thung Tao"
//         }
//     ],
//     "receiver": {
//         "_id": "5fb411df8173b602387d8768",
//         "name": "Lam Nguyen"
//     },
//     "sender": {
//         "_id": "5fb411eb8173b602387d8769",
//         "name": "Lam Nguyen"
//     },
//     "__v": 0
// }
// STATUS IS FOR HANDLING RETURN FROM AXIOS
    return axios.get(requestUrl).then(res => {
        return { status: true, transaction: res.data };
    }).catch(err => {
        return {
            status: false,
            errCode: err.response.status,
            message: err.response.data.message, // ["error message goes here"]
        };
    })
}