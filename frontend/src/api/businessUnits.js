import { request } from "../utils/request";

const businessUnits = {
  getAllBusinessUnits: async (periodId) => {
    let response;
    try {
      let queryParams = "";
      if (periodId) {
        queryParams += `?periodId=${periodId}`;
      }
      const url = `${import.meta.env.VITE_API_BASE_URL}/businessUnits${queryParams}`;
      const method = "GET";
      response = await request(url, method);
      if (!response.ok) {
        throw new Error("Failed to getAllBusinessUnits");
      }
      const { data } = await response.json();
      return { success: true, data };
    } catch (error) {
      const { error: errorMessage } = await response.json();
      console.error(error.message);
      console.error(errorMessage);
      return { message: errorMessage, success: false };
    }
  },
};

export { businessUnits };
