export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: {
    field?: string;
    message: string;
  }[];
}
