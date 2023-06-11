import data from "../data/users.json";

const API_ENDPOINT = "https://randomuser.me/api/?results=100";

export const api = {
  users: {
    list: (): Promise<APIResponse> => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          return res(data as APIResponse);
        }, 200);
      });
    },
  },
};
