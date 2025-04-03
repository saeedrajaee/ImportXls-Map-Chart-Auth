import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "" };
};

export const get = async (path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...getHeaders() },
  });
  return res.json();
};

export const getUnique = async (path: string, id: string) => {
  const res = await fetch(`${API_URL}/${path}/${id}`, {
    headers: { ...getHeaders() },
  });
  return res.json();
};

export const patch = async (path: string, formData: FormData, id: string) => {
  const res = await fetch(`${API_URL}/${path}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();

  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "" };
};

export const deleted = async (path: string, id: string) => {
  const res = await fetch(`${API_URL}/${path}/${id}`, {
    method: "DELETE",
    headers: { ...getHeaders() },
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "" };
};