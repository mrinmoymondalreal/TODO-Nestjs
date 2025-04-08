import React from "react";
import Centered from "../components/Centered";
import { getBasicInstance } from "../service/api";
import { saveAuth } from "../service/auth";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { refreshUser } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    // Handle form submission logic here
    const formData = new FormData(formRef.current!, buttonRef.current!);
    console.log("Form submitted!");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const resp = await getBasicInstance().post("/auth", {
        email,
        password,
      });

      saveAuth(resp.data.accessToken);
      refreshUser();

      navigate("/");
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("An error occurred during sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Centered>
      <div className="flex flex-col w-full max-w-[400px] gap-4">
        <div role="alert" className="alert alert-error" hidden={error == null}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
        <div className="text-center w-full max-w-[400px]">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p>Welcome to the Sign In page!</p>
          <form
            ref={formRef}
            className="flex flex-col gap-2 text-left w-full"
            onSubmit={handleSubmit}
          >
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input w-full min-w-full"
                placeholder="Enter your email"
                name="email"
                required
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input w-full min-w-full"
                placeholder="Enter your password"
                name="password"
                required
              />
            </fieldset>
            <button
              disabled={loading}
              className="btn btn-primary"
              ref={buttonRef}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </Centered>
  );
}

export default SignUp;
