import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { FormFileDrop } from "@/components/FormFileDrop";
import { safeGet, safeSet, STORAGE_KEYS } from "@/lib/storage";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const empty = {
  step: 0,
  title: "",
  subtitle: "",
  category: "Data Science",
  description: "",
  modules: [{ title: "Module 1", lessons: ["Lesson 1"] }],
  price: 1499,
};

const steps = ["Details", "Curriculum", "Pricing", "Review"];

export default function AdminCourseBuilder() {
  const nav = useNavigate();
  const [draft, setDraft] = useState(() => safeGet(STORAGE_KEYS.courseDraft, empty, "session"));
  useEffect(() => { safeSet(STORAGE_KEYS.courseDraft, draft, "session"); }, [draft]);

  const next = () => setDraft((d) => ({ ...d, step: Math.min(3, d.step + 1) }));
  const prev = () => setDraft((d) => ({ ...d, step: Math.max(0, d.step - 1) }));
  const submit = () => {
    toast.success("Course published! (mock)");
    safeSet(STORAGE_KEYS.courseDraft, empty, "session");
    nav("/admin/courses");
  };

  return (
    <>
      <SEO title="Admin · New Course" />
      <div className="max-w-3xl mx-auto">
        <ol className="flex items-center gap-3 mb-8">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3 flex-1">
              <span className={cn("w-8 h-8 rounded-full grid place-items-center font-black text-sm", i <= draft.step ? "primary-gradient text-on-primary" : "bg-surface-container-low text-on-surface-variant")}>{i + 1}</span>
              <span className={cn("font-bold text-sm hidden md:inline", i === draft.step ? "text-on-surface" : "text-on-surface-variant")}>{s}</span>
              {i < steps.length - 1 && <span className="flex-1 h-px bg-outline-variant" />}
            </li>
          ))}
        </ol>

        <div className="bg-surface-container-lowest rounded-2xl p-6 space-y-5">
          {draft.step === 0 && (
            <>
              <h2 className="text-xl font-black text-on-surface">Course details</h2>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Title</label>
                <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Python for Data Science" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Subtitle</label>
                <input value={draft.subtitle} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Description</label>
                <textarea rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Thumbnail</label>
                <FormFileDrop accept="image/*" maxSizeMB={5} label="Drop course thumbnail" />
              </div>
            </>
          )}
          {draft.step === 1 && (
            <>
              <h2 className="text-xl font-black text-on-surface">Curriculum</h2>
              {draft.modules.map((m, mi) => (
                <div key={mi} className="bg-surface-container-low rounded-xl p-4 space-y-3">
                  <input value={m.title} onChange={(e) => { const ms = [...draft.modules]; ms[mi] = { ...m, title: e.target.value }; setDraft({ ...draft, modules: ms }); }} className="w-full bg-surface-container-lowest rounded-lg px-3 py-2 font-bold outline-none focus:ring-2 focus:ring-primary" />
                  {m.lessons.map((l, li) => (
                    <input key={li} value={l} onChange={(e) => { const ms = [...draft.modules]; const ls = [...ms[mi].lessons]; ls[li] = e.target.value; ms[mi] = { ...m, lessons: ls }; setDraft({ ...draft, modules: ms }); }} className="w-full bg-surface-container-lowest rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                  ))}
                  <button onClick={() => { const ms = [...draft.modules]; ms[mi] = { ...m, lessons: [...m.lessons, `Lesson ${m.lessons.length + 1}`] }; setDraft({ ...draft, modules: ms }); }} className="text-primary text-sm font-bold flex items-center gap-1"><Icon name="add" className="text-base" /> Add lesson</button>
                </div>
              ))}
              <button onClick={() => setDraft({ ...draft, modules: [...draft.modules, { title: `Module ${draft.modules.length + 1}`, lessons: ["Lesson 1"] }] })} className="px-4 py-2 bg-surface-container-low rounded-xl font-bold text-sm flex items-center gap-2"><Icon name="add" className="text-base" /> Add module</button>
            </>
          )}
          {draft.step === 2 && (
            <>
              <h2 className="text-xl font-black text-on-surface">Pricing</h2>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Price (₹)</label>
                <input type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: +e.target.value })} className="w-full mt-1.5 bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </>
          )}
          {draft.step === 3 && (
            <>
              <h2 className="text-xl font-black text-on-surface">Review</h2>
              <pre className="bg-surface-container-low rounded-xl p-4 text-sm text-on-surface overflow-auto">{JSON.stringify(draft, null, 2)}</pre>
            </>
          )}

          <div className="flex justify-between pt-4">
            <button onClick={prev} disabled={draft.step === 0} className="px-5 py-2.5 bg-surface-container-low rounded-xl font-bold disabled:opacity-50">Back</button>
            {draft.step < 3 ? (
              <button onClick={next} className="px-5 py-2.5 primary-gradient text-on-primary rounded-xl font-bold">Continue</button>
            ) : (
              <button onClick={submit} className="px-5 py-2.5 primary-gradient text-on-primary rounded-xl font-bold">Publish course</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
