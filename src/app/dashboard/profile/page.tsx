import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { onSave } from "./actions";
export default function () {
  return (
    <>
      <form action={onSave}>
        <Label htmlFor="fullName">Full Name:</Label>
        <Input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Enter your fullname"
          required
        />
        <Button type="submit">Save</Button>
      </form>
    </>
  );
}
