import axios from "axios";

const URL: string = "http://localhost:2299/api";

export const createUser = async (data: any) => {
  try {
    const config: any = {
      headers: {
        "content-types": "multipart/form-data",
      },
    };
    return await axios.post(`${URL}/create-user`, data, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (data: any) => {
  try {
    return await axios.post(`${URL}/sign-user`, data).then((res) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};

export const getUser = async (userID: any) => {
  try {
    return await axios.get(`${URL}/one-user/${userID}`).then((res) => {
      return res.data.data;
    });
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    return await axios.get(`${URL}/users/`).then((res) => {
      return res.data.data;
    });
  } catch (error) {
    return error;
  }
};

export const addFriend = async (userID: string, friendID: string) => {
  try {
    return await axios
      .patch(`${URL}/add-friend/${userID}/${friendID}`)
      .then((res) => {
        return res.data.data;
      });
  } catch (error) {
    return error;
  }
};
