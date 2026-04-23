import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/contexts/AuthContext";
import authHero from "@/assets/auth-hero.jpg";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

export default function Signup() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await signup(data);
    navigate("/language", { replace: true });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      <SEO title="Create Account" description="Start learning hands-on with GyaanSetu." />
      <div className="flex items-center justify-center p-8 order-2 lg:order-1">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-5">
          <div>
            <h1 className="text-3xl font-black text-on-surface">Create your account</h1>
            <p className="text-on-surface-variant text-sm mt-1">Already a member? <Link to="/login" className="text-primary font-bold">Sign in</Link></p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full name</label>
            <input {...register("name")} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary" placeholder="Aanya Sharma" />
            {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
            <input {...register("email")} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
            {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
            <input type="password" {...register("password")} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary" placeholder="At least 6 characters" />
            {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button disabled={loading} className="w-full px-6 py-3 primary-gradient text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <Icon name="progress_activity" className="animate-spin" /> : "Create account"}
          </button>
          <p className="text-xs text-on-surface-variant text-center">By signing up you agree to our Terms and Privacy Policy.</p>
        </form>
      </div>
      <div className="hidden lg:flex primary-gradient text-on-primary p-12 flex-col justify-between relative overflow-hidden order-1 lg:order-2">
        <div className="self-end relative z-10">
          <Link to="/" className="text-2xl font-black italic">GyaanSetu</Link>
        </div>
        <div className="relative z-10 flex justify-center my-6">
          <img
            src={authHero}
            alt="Students learning together at GyaanSetu"
            width={1024}
            height={1280}
            className="w-full max-w-sm rounded-3xl shadow-2xl ring-1 ring-on-primary/20"
          />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black tracking-tight leading-tight">Step into The Digital Courtyard.</h2>
          <p className="opacity-90 mt-3 max-w-md">Real labs. Real projects. Real outcomes — taught in your language.</p>
        </div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-on-primary/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
