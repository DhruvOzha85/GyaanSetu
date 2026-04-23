import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/contexts/AuthContext";
import authHero from "@/assets/auth-hero.jpg";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
});

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const user = await login(values);
      const dest = location.state?.from?.pathname ?? (user.role === "admin" ? "/admin" : "/dashboard");
      navigate(dest, { replace: true });
    },
  });

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      <SEO title="Sign In" description="Sign in to your GyaanSetu account." />
      <div className="hidden lg:flex primary-gradient text-on-primary p-12 flex-col justify-between relative overflow-hidden">
        <Link to="/" className="text-2xl font-black italic relative z-10">GyaanSetu</Link>
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
          <h2 className="text-4xl font-black tracking-tight leading-tight">Welcome back to The Digital Courtyard.</h2>
          <p className="opacity-90 mt-3 max-w-md">Pick up exactly where you left off — your labs, notes, and progress are waiting.</p>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-on-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="flex items-center justify-center p-8">
        <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-5">
          <div>
            <h1 className="text-3xl font-black text-on-surface">Sign in</h1>
            <p className="text-on-surface-variant text-sm mt-1">New here? <Link to="/signup" className="text-primary font-bold">Create an account</Link></p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
            <input
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-error text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary font-bold">Forgot?</Link>
            </div>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-error text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !formik.isValid}
            className="w-full px-6 py-3 primary-gradient text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Icon name="progress_activity" className="animate-spin" /> : "Sign in"}
          </button>
          <p className="text-xs text-on-surface-variant text-center">Tip: use an email containing "admin" to log in as admin (mock).</p>
        </form>
      </div>
    </div>
  );
}
