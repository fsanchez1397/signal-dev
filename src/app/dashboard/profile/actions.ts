"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";
const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  githubUrl: z
    .string()
    .url({ message: "Please enter a valid GitHub URL." })
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(500, { message: "Bio must be less than 500 characters." })
    .optional(),
  visaNeeded: z.coerce.boolean().optional(), // Coerce turns form values like "on" into true/false
});

interface ActionResult {
  success: boolean;
  message?: string;
  errors?: {
    field?: string;
    message: string;
  }[];
}
export const onSave = async (
  prevState: any,
  formData: FormData
): Promise<ActionResult> => {
  try {
    const rawFormData = Object.fromEntries(formData.entries());
    const result = profileSchema.safeParse(rawFormData);
    console.log("first");
    if (!result.success) {
      return { success: false };
    }
    const supabase = await createClient();
    // const profileData = { fullName: formData.get("fullName") as string };

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("CandidateProfile")
      .upsert({ userId: user.id, ...result.data });
    if (error) {
      console.error("Error upserting profile data:", error);
      return {
        success: false,
        message: "Database Error: Could not save profile.",
      };
    }
    revalidatePath("/dashboard/profile");
    return { success: true, message: "Profile updated successfully!" };
  } catch (e) {
    let errorMessage = "An unexpected error occured please try again.";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    console.error("An unexpected error occurred:", errorMessage);
    return {
      success: false,
      message: "Could not update profile. Please try again later.",
    };
  }
};
