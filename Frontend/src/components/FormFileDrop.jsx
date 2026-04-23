import { useCallback, useState } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/**
 * Reusable drag & drop file upload zone with preview, type & size validation.
 */
export function FormFileDrop({
  accept = "image/*",
  maxSizeMB = 10,
  multiple = false,
  onFiles,
  label = "Drop files to upload",
  hint,
}) {
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(false);

  const handleFiles = useCallback(
    (incoming) => {
      if (!incoming) return;
      const arr = Array.from(incoming);
      const valid = arr.filter((f) => {
        if (f.size > maxSizeMB * 1024 * 1024) {
          toast.error(`${f.name} exceeds ${maxSizeMB} MB limit`);
          return false;
        }
        if (accept && accept !== "*") {
          const ok = accept.split(",").some((a) => {
            const trimmed = a.trim();
            if (trimmed.endsWith("/*")) return f.type.startsWith(trimmed.replace("/*", ""));
            return f.type === trimmed || f.name.endsWith(trimmed.replace(".", ""));
          });
          if (!ok) {
            toast.error(`${f.name} has an unsupported type`);
            return false;
          }
        }
        return true;
      });
      const next = multiple ? [...files, ...valid] : valid.slice(0, 1);
      setFiles(next);
      onFiles?.(next);
    },
    [files, maxSizeMB, accept, multiple, onFiles],
  );

  const onDrop = (e) => {
    e.preventDefault();
    setActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const remove = (idx) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
    onFiles?.(next);
  };

  return (
    <div className="space-y-3">
      <label
        onDragOver={(e) => { e.preventDefault(); setActive(true); }}
        onDragLeave={() => setActive(false)}
        onDrop={onDrop}
        className={cn(
          "block rounded-2xl border-2 border-dashed cursor-pointer transition-colors p-8 text-center",
          active
            ? "border-primary bg-primary-fixed/40"
            : "border-outline-variant bg-surface-container-low hover:bg-surface-container",
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-14 h-14 mx-auto rounded-2xl primary-gradient text-on-primary grid place-items-center mb-4">
          <Icon name="cloud_upload" className="text-3xl" />
        </div>
        <p className="font-bold text-on-surface">{label}</p>
        <p className="text-on-surface-variant text-sm mt-1">
          {hint ?? `or click to browse — up to ${maxSizeMB} MB`}
        </p>
      </label>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-3 bg-surface-container-lowest rounded-xl p-3"
            >
              {f.type.startsWith("image/") ? (
                <img src={URL.createObjectURL(f)} alt={f.name} className="w-12 h-12 rounded-lg object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-surface-container-low grid place-items-center text-on-surface-variant">
                  <Icon name="description" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-on-surface truncate">{f.name}</p>
                <p className="text-xs text-on-surface-variant">{(f.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="w-9 h-9 grid place-items-center rounded-xl text-on-surface-variant hover:text-error hover:bg-error-container/30"
                aria-label="Remove file"
              >
                <Icon name="close" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
