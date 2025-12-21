import axios from "axios";
import { VNO_API_URL } from "@/config/env";

export const publicApi = axios.create({
  baseURL: `${VNO_API_URL}/api/v1`,
});
