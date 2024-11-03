import { async } from "regenerator-runtime";
import { API_URL, defaultRegion } from "./config.js";

export const apiRequest = async function (fields) {
  try {
    const res = await fetch(`${API_URL}${fields}`);
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("⚡Some data has not arrived");
    return []; // Return empty array or handle error as appropriate
  }
};
