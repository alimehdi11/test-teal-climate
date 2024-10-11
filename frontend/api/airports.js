import { request } from "../src/utils/request";

const airports = {
  getAllAirports: async () => {
    let response;
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/airports`;
      const method = "GET";
      response = await request(url, method);
      if (!response.ok) {
        throw new Error("Failed to getAllAirports");
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

export { airports };
