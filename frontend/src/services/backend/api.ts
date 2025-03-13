import { StatusCodes } from "http-status-codes";

const BASE_URL = ''; // Replace with your backend URL

async function get<T>(url: string) {
  const response = await fetch(`${BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (response.status === StatusCodes.NO_CONTENT) {
    return undefined as T;
  }
  return response.json() as T;
}

async function post<T> (url: string, data?: unknown) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (response.status === StatusCodes.NO_CONTENT) {
    return undefined as T;
  }
  return response.json() as T;
}

export const api = {
  get,
  post,
  // Add other methods (PUT, DELETE, etc.) as needed
};