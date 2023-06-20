// import data from "../data/users.json";

const API_ENDPOINT = "https://randomuser.me/api/?results=10&seed=diegoacostadev";

export const api = {
  users: {
    list: async (currentPage = 1): Promise<APIResponse> => {
      try {
        const res = await fetch(`${API_ENDPOINT}&page=${currentPage}`);

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
