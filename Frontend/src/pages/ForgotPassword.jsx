import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { authService } from "@/services/authService";
import { toast } from "sonner";

const schema = z.object({ email: z.string().email("Enter a valid email") });

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await authService.forgotPassword(data.email);
    setSent(true);
    toast.success("Check your inbox for a reset link.");
  };

  return (
    <div className="min-h-screen grid place-items-center bg-surface px-6">
      <SEO title="Reset Password" />
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-8 shadow-ambient">
        <Link to="/login" className="text-primary text-sm font-bold flex items-center gap-1 mb-6"><Icon name="arrow_back" className="text-base" /> Back to sign in</Link>
        <h1 className="text-3xl font-black text-on-surface mb-2">Forgot password?</h1>
        <p className="text-on-surface-variant text-sm mb-6">Enter your email and we'll send you a reset link.</p>
        {sent ? (
          <div className="bg-secondary-fixed text-on-secondary-fixed rounded-xl p-5 flex items-start gap-3">
            <Icon name="mark_email_read" className="text-2xl" />
            <div>
              <p className="font-bold">Email sent!</p>
              <p className="text-sm">If an account exists, you'll get a reset link shortly.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
              <input {...register("email")} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </div>
            <button disabled={isSubmitting} className="w-full px-6 py-3 primary-gradient text-on-primary font-bold rounded-xl disabled:opacity-60">
              Send reset link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
