import axios from "axios";

export const createAssetRequest = async ({
                                           ID,
                                           name,
                                           quantity,
                                           unit,
                                           description
                                         }) => {
  const url = `${process.env.LEDGER_SERVER}/asset/`;
  try {
    const result = await axios.post(url, {
      ID,
      name,
      quantity,
      unit,
      description
    });
    // This is temp work because Ledger always return code 200
    if (result.data.message != "Success") {
      return { status: false, message: "Created Failed" };
    }
    return { status: true };
  } catch (err) {
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message
    };
  }
};
