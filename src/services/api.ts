// import data from "../data/users.json";

const API_ENDPOINT = "https://randomuser.me/api/?results=100";

export const api = {
  users: {
    list: async (): Promise<APIResponse> => {
      try {
        const res = await fetch(API_ENDPOINT);

        if (res.ok) {
          const data = (await res.json()) as APIResponse;

          if (data.error) {
            return Promise.reject(new Error(data.error));
          }

          return data;
        } else {
          return Promise.reject(new Error(`No results were found.`));
        }
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
