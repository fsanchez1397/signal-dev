"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
// import { onSubmit } from "./action";
import Editor from "@monaco-editor/react";
export default function ChallengePage() {
  const initialState = {
    success: false,
    message: "",
    errors: [],
  };
  //   const [state, formAction] = useActionState(onSubmit, initialState);

  return (
    <>
      <p>Coming Soon</p>
      <form>
        {/* <form action={formAction}></form> */}
        <Textarea placeholder="Example" />
        <Button type="submit">Submit</Button>
      </form>
      <Editor
        height="70vh"
        defaultLanguage="javascript"
        defaultValue="// Begin Coding"
      />
    </>
  );
}
