import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { authService } from "@/services/authService";
import { toast } from "sonner";

const schema = z.object({
  password: z.string().min(6),
  confirm: z.string().min(6),
}).refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });

export default function ResetPassword() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data) => {
    await authService.resetPassword("token", data.password);
    toast.success("Password updated. Please sign in.");
    nav("/login");
  };
  return (
    <div className="min-h-screen grid place-items-center bg-surface px-6">
      <SEO title="Set New Password" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-8 shadow-ambient space-y-4">
        <h1 className="text-2xl font-black text-on-surface">Set a new password</h1>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">New password</label>
          <input type="password" {...register("password")} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
          {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Confirm password</label>
          <input type="password" {...register("confirm")} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
          {errors.confirm && <p className="text-error text-xs mt-1">{errors.confirm.message}</p>}
        </div>
        <button disabled={isSubmitting} className="w-full px-6 py-3 primary-gradient text-on-primary font-bold rounded-xl">Update password</button>
        <Link to="/login" className="block text-center text-primary text-sm font-bold">Back to sign in</Link>
      </form>
    </div>
  );
}
