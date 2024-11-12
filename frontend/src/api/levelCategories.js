import { request } from "../utils/request";

const level1Categories = {
  getAllLevel1Categories: async (selectedLevel) => {
    let response;
    try {
      const queryParams = {
        level1: selectedLevel,
        distinct: true,
        column: "category",
      };
      const queryString = "?" + new URLSearchParams(queryParams).toString();
      const url = `${import.meta.env.VITE_API_BASE_URL}/level1Categories${queryString}`;
      const method = "GET";
      response = await request(url, method);
      if (!response.ok) {
        throw new Error("Failed to getAllLevel1Categories");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      const { error: errorMessage } = await response.json();
      console.error(error.message);
      console.error(errorMessage);
      return { message: errorMessage, success: false };
    }
  },
};

export { level1Categories };
