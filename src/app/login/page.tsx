import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <div className="border-red-500 border-2">
        <label htmlFor="email">Email:</label>

        <input id="email" name="email" type="email" required />
      </div>
      <div className="border-red-500 border-2">
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </div>
      <button formAction={login} className="border-red-500 border-2">
        Log in
      </button>
      <button
        formAction={signup}
        className="border-red-500 border-2 bg-amber-200"
      >
        Sign up
      </button>
    </form>
  );
}
