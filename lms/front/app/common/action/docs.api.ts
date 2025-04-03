"use server";

import {
  getHeaders,
  deleted,
  get,
  getUnique,
  patch,
  post,
} from "@/common/util/fetch";
import { API_URL } from "@/constants/api";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getErrorMessage } from "../util/errors";

export async function createLibrary(formData: any) {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
  const res = await fetch(`${API_URL}/librarys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  const libraryImage = formData.get("image");
  if (libraryImage instanceof File && res.ok) {
    await uploadLibraryImage(parsedRes.id, libraryImage);
  }
  revalidatePath("/library", "page");
  redirect("/library");
}

async function uploadLibraryImage(libraryId: number, file: File) {

  console.log("file.............",file)

  const formData = new FormData();
  formData.append("image", file);
  await fetch(`${API_URL}/librarys/${libraryId}/image`, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });
}

export default async function getLibrarys() {
  const librarys = await get("librarys");
  return librarys;
}

export async function getUniqueLibrary(id: string) {
  const library = await getUnique("librarys", id);
  return library;
}

export async function updateLibrary(formData: FormData, id: string) {
  const error = await patch("librarys", formData, id);
  revalidatePath("/library", "page");
  redirect("/library");
  if (error) {
    return { error };
  }
}

export async function deleteLibrary(id: string) {
  const error = await deleted("librarys", id);
  revalidatePath("/library", "page");
  redirect("/library");
  if (error) {
    return { error };
  }
}




// export async function createDoc(_prevState: any, formData: FormData) {
//   const { error } = await post("library", formData);
//   if (error) {
//     return { error };
//   }
//   redirect("/library");
// }

// export async function createDoc(_prevState: any,formData: FormData) {
//   console.log("formData.............",formData)
//   const response = await post("docs", formData);
//   // const response = await post("docs", formData);
//   console.log("response.............",response)

//   const docImage = formData.get("image");
//   console.log("docImage.............",docImage)

//   // if (docImage instanceof File && !response.error) {
//   //   await uploadDocImage(response.data.id, docImage);
//   // }
//   revalidateTag("library");
//   return response;
// }
