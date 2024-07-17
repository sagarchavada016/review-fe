import axios from "axios";
import { Toast } from "../../utils/Toasts";
import { urls } from "../Urls";

export class ReviewService {
  static axiosInstance = axios.create({
    baseURL: urls.local_base_url,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static async get(url) {
    try {
      const response = await this.axiosInstance.get(url);
      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return Promise.reject(error);
    }
  }

  static async post(url, body) {
    try {
      const response = await this.axiosInstance.post(url, body);
      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return Promise.reject(error);
    }
  }

  static handleErrors(error) {
    if (error.response && error.response.status === 403) {
      Toast.error(
        "Access forbidden: You do not have permission to access this resource."
      );
    } else if (error.response) {
      const errorMessage =
        error.response.data.message ||
        "Something went wrong, please try again.";
      Toast.error(errorMessage);
    } else {
      Toast.error("Network error, please try again.");
    }
  }
}
