"use server";
import { revalidatePath, revalidateTag } from "next/cache";
export async function revalidateF(tag: string) {
  revalidateTag(tag);
}

export async function revalidateP(path: string) {
  revalidatePath(path);
}
