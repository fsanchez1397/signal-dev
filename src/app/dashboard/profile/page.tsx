import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function () {
  return (
    <>
      <form>
        <Input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Enter your fullname"
          required
        />
        <Button>Save</Button>
      </form>
    </>
  );
}
