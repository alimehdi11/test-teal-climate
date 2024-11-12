import { request } from "../utils/request";

const countries = {
  getCountries: async (queryParams) => {
    let response;
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/countries${queryParams}`;
      const method = "GET";
      response = await request(url, method);
      if (!response.ok) {
        throw new Error("Failed to getCountries");
      }
      return await response.json();
    } catch (error) {
      const { error: errorMessage } = await response.json();
      console.error(error.message);
      console.error(errorMessage);
      return { message: errorMessage, success: false };
    }
  },
};

export { countries };
