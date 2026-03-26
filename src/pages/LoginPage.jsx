import { usePageTitle } from "@/hooks";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import { useForm } from "react-hook-form";
import InputField from "@/components/auth/InputField";

export default function LoginPage() {
  usePageTitle("Login");
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-[var(--color-primary)]">
            Welcome Back
          </h1>
          <p className="text-[var(--color-text-muted)]">
            Log in to access your wishlist
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label={"Email"}
            type={"email"}
            name="email"
            register={register}
            placeholder="Email"
            error={errors.email}
          />

          <div className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium">Password</label>
              <Link
                to="/forgot-password"
                size="sm"
                className="text-xs text-[var(--color-primary)] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <InputField
              type={"password"}
              name="password"
              register={register}
              placeholder="•••••••"
              error={errors.password}
            />
          </div>

          <button type="submit" className="w-full mt-2 btn-primary">
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            New to the app?{" "}
            <Link
              to="/register"
              className="text-[var(--color-primary)] font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
