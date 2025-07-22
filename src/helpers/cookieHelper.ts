import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.set(key, value);
  return cookie;
};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(key);
  return cookieValue;
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.delete(key);
  return cookie;
};

export const hasCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.has(key);
};
