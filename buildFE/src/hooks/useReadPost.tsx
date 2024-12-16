import useSWR from "swr";
import { readPost } from "../api/postAPI";
import { getUser, getUsers } from "../api/userAPI";

export const useReadPost = (userID: string) => {
  const { data, isLoading } = useSWR(`read-post/${userID}`, () =>
    readPost(userID)
  );
  return { data, isLoading };
};
export const useOneReadUser = (userID: string) => {
  const { data, isLoading } = useSWR(`one-user/${userID}`, () =>
    getUser(userID)
  );
  return { data, isLoading };
};
export const useReadUser = () => {
  const { data, isLoading } = useSWR(`users/`, getUsers);
  return { data, isLoading };
};
