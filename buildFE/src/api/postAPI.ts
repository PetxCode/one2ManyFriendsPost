import axios from "axios";

const URL = "http://localhost:2299/api";

export const readPost = async (userID: string) => {
  try {
    return await axios.get(`${URL}/read-post/${userID}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};

export const ceratePost = async (userID: string, data: any) => {
  try {
    const config: any = {
      headers: {
        "content-types": "multipart/form-data",
      },
    };
    return await axios
      .post(`${URL}/create-post/${userID}`, data, config)
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    return error;
  }
};
