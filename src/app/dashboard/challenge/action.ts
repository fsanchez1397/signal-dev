// "use server";
// import type { ActionResult } from "@/lib/types";
// export const onSubmit = (
//   prevState: ActionResult,
//   formData: FormData
// ): Promise<ActionResult> => {
//   try {
//     const rawFormData = Object.fromEntries(formData.entries());
//     const result = profileSchema.safeParse(rawFormData);
//     if (!result.success) {
//       return {
//         success: false,
//         errors: result.error.errors.map((err) => ({
//           field: err.path.join("."),
//           message: err.message,
//         })),
//       };
//     }
//   } catch (e) {}
// };
