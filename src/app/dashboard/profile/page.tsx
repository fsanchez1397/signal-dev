"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { onSave } from "./actions";
export default function () {
  const initState = {
    success: false,
    message: "",
    errors: [],
  };
  const [state, formAction, isPending] = useActionState(onSave, initState);
  return (
    <>
      <form action={formAction}>
        <Label htmlFor="fullName">Full Name:</Label>
        <Input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Enter your fullname"
          required
        />
        <Button type="submit">Save</Button>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </form>
    </>
  );
}
