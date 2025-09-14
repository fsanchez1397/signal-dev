"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma/prisma";
import z from "zod";
import type { ActionResult } from "@/lib/types";
const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  githubUrl: z
    .string()
    .url({ message: "Please enter a valid GitHub URL." })
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(500, { message: "Bio must be less than 500 characters." })
    .optional(),
  visaNeeded: z.coerce.boolean(),
});

export const onSave = async (
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> => {
  try {
    const rawFormData = Object.fromEntries(formData.entries());
    const result = profileSchema.safeParse(rawFormData);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in to update your profile.",
      };
    }

    await prisma.candidateProfile.update({
      where: {
        userId: user.id,
      },
      data: result.data,
    });

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
