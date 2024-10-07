import { request } from "../src/utils/request";

const level1Categories = {
  getAllLevel1Categories: async (selectedLevel) => {
    let response;
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/level1Categories?level1=${selectedLevel}&distinct=true&column=category`;
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
  }
};

export { level1Categories };
