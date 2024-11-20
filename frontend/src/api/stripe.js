import { request } from "../utils/request";

const stripe = {
    getPaymentMethodById: async (id) => {
        let response;
        try {
            const url = `${import.meta.env.VITE_API_BASE_URL}/stripe/paymentMethods/${id}`;
            const method = "GET";
            response = await request(url, method);
            if (!response.ok) {
                throw new Error("Failed to getPaymentMethodById");
            }
            const data = await response.json();
            return data
        } catch (error) {
            const { error: errorMessage } = await response.json();
            console.error(error.message);
            console.error(errorMessage);
            return { message: errorMessage, success: false };
        }
    },
};

export { stripe};
