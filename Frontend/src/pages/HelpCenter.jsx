import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const faqs = [
  { q: "How do the browser labs work?", a: "We spin up a sandboxed container in seconds — no installs, no setup, just code." },
  { q: "Can I learn in Hindi or Gujarati?", a: "Yes. Many of our most popular courses are taught in Hindi and Gujarati, with English subtitles." },
  { q: "Do I get a certificate?", a: "Pro learners get a verified certificate on completion. Free learners can still showcase their progress." },
  { q: "Is there a refund policy?", a: "Yes — any paid plan can be refunded within 7 days, no questions asked." },
];

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10, "Tell us a bit more"),
});

export default function HelpCenter() {
  const [open, setOpen] = useState(0);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thanks! We'll respond within 24 hours.");
    reset();
  };

  return (
    <>
      <SEO title="Help Center & Contact" />
      <section className="bg-surface-container-low py-12 text-center">
        <h1 className="text-4xl font-black text-on-surface">How can we help?</h1>
        <p className="text-on-surface-variant mt-2">Frequently asked, freshly answered.</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-12">
        <div className="space-y-3">
          <h2 className="text-xl font-black text-on-surface mb-4">FAQs</h2>
          {faqs.map((f, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-2xl">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-bold text-on-surface">{f.q}</span>
                <Icon name={open === i ? "remove" : "add"} />
              </button>
              {open === i && <p className="px-5 pb-5 text-on-surface-variant text-sm">{f.a}</p>}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-container-lowest rounded-2xl p-6 space-y-4 h-fit">
          <h2 className="text-xl font-black text-on-surface">Contact us</h2>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Name</label>
            <input {...register("name")} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
            {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
            <input {...register("email")} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
            {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Message</label>
            <textarea rows={4} {...register("message")} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary resize-none" />
            {errors.message && <p className="text-error text-xs mt-1">{errors.message.message}</p>}
          </div>
          <button disabled={isSubmitting} className="w-full px-6 py-3 primary-gradient text-on-primary font-bold rounded-xl">Send message</button>
        </form>
      </section>
    </>
  );
}
