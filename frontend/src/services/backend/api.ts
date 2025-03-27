import { StatusCodes } from "http-status-codes";
import { AccountStore } from "../../stores/accountStore";
import { FrontEndRoutes } from "../../pages/routes";

const BASE_URL = ''; // Replace with your backend URL

async function get<T>(url: string) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return handleResponse<T>(response);
}

async function post<T> (url: string, data?: unknown) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

function handleResponse<T>(response: Response) {
  if (response.status === StatusCodes.UNAUTHORIZED) {
    // get out of here, user is aunothorized.
    window.location.href = FrontEndRoutes.Login;
    AccountStore.deleteInstance();
  }
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