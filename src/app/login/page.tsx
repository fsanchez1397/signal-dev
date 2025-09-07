import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <form>
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>

      <Button formAction={login}>Log In</Button>

      <Button formAction={signup}>Sign Up</Button>
    </form>
  );
}
