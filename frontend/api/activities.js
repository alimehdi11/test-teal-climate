import { request } from "../src/utils/request";

const activities = {
  getAllActivities: async (queryParams) => {
    let response;
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/activities${queryParams}`;
      const method = "GET";
      response = await request(url, method);
      if (!response.ok) {
        throw new Error("Failed to getAllLevel1Categories");
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

export { activities };
