import { request } from "../src/utils/request";

const businessUnitsActivities = {
  getAllBusinessUnitsActivities: async () => {
    let response;
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities`;
      const method = "GET";
      response = await request(url, method);
      if (!response.ok) {
        throw new Error("Failed to getAllBusinessUnitsActivities");
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
  createBusinessUnitActivity: async (payload) => {
    let response;
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities`;
      const method = "POST";
      response = await request(url, method, payload);
      if (!response.ok) {
        throw new Error("Failed to createBusinessUnitActivity");
      }
      const { message, data } = await response.json();
      return { success: true, message, data };
    } catch (error) {
      const { error: errorMessage } = await response.json();
      console.error(error.message);
      console.error(errorMessage);
      return { message: errorMessage, success: false };
    }
  },
  updateBusinessUnitActivityById: async (id, payload) => {
    let response;
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities/${id}`;
      const method = "PUT";
      response = await request(url, method, payload);
      if (!response.ok) {
        throw new Error("Failed to updateBusinessUnitActivityById");
      }
      const { message } = await response.json();
      return { success: true, message };
    } catch (error) {
      const { error: errorMessage } = await response.json();
      console.error(error.message);
      console.error(errorMessage);
      return { message: errorMessage, success: false };
    }
  },
  getBusinessUnitActivityById: async (id) => {
    let response;
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities/${id}`;
      const method = "GET";
      response = await request(url, method);
      if (!response.ok) {
        throw new Error("Failed to getBusinessUnitsActivityById");
      };
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      const { error: errorMessage } = await response.json();
      console.error(error.message);
      console.error(errorMessage);
      return { message: errorMessage, success: false };
    }
  }
};

export { businessUnitsActivities };
