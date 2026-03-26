import { usePageTitle } from "@/hooks";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schemas/registerSchem";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/auth/InputField";

export default function RegisterPage() {
  usePageTitle("Create Account");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-[var(--color-primary)]">
            Join the Club
          </h1>
          <p className="text-[var(--color-text-muted)]">
            Create an account to start your wishlist
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label={"Username"}
            type={"text"}
            name="username"
            register={register}
            placeholder="Username"
            error={errors.username}
          />

          <InputField
            label={"Email"}
            type={"email"}
            name="email"
            register={register}
            placeholder="Email"
            error={errors.email}
          />

          <InputField
            label={"Password"}
            type={"password"}
            name="password"
            register={register}
            placeholder="Password"
            error={errors.password}
          />
          <InputField
            label={"Confirm Password"}
            type={"password"}
            name="confirmPassword"
            register={register}
            placeholder="Confirm Password"
            error={errors.confirmPassword}
          />

          <button type="submit" className="w-full mt-4 btn-primary">
            Create Account
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-sm text-center text-[var(--color-text-muted)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
