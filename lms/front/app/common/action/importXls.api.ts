"use server";

import { deleted, get, getUnique, patch, post} from "@/common/util/fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ImportXlsProps = {
  X: number;
  Y: number;
  description: string;
};

export default async function getImportXls(){
  const importXls = await get("gcp")
     return importXls;
 }


export async function createBulkUsers(importXls: ImportXlsProps[]) {
  try {
    for (const importData of importXls) {
      // console.log("1.importData-----------",importData)
      const res = await fetch("http://localhost:3001/gcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify((importData)),
        
      });
      const data = await res.json();
            console.log("2.data-----------",data)
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createGcp(_prevState: any, formData: FormData) {
  const { error } = await post("gcp", formData);
  if (error) {
    return { error };
  }
  redirect("/importXls");
}

export async function getUniqueGcp(id: string) {
  const gcp = await getUnique("gcp",id)
  return gcp;
}

export async function updateGcp( formData: FormData, id: string) {
  const error = await patch("gcp",formData,id)
  revalidatePath("/importXls", "page");
  redirect("/importXls");
  if (error) {
    return { error };
  }
  };

  export async function deleteGcp(id: string) {
    const error = await deleted("gcp",id)
    revalidatePath("/importXls", "page");
    redirect("/importXls");
    if (error) {
      return { error };
    }
  }