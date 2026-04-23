import { cn } from "@/lib/utils";

/**
 * <Icon name="rocket_launch" /> renders a Material Symbols Outlined glyph.
 * Use `filled` for a solid variant.
 */
export function Icon({ name, className, filled, style }) {
  return (
    <span
      aria-hidden
      className={cn("material-symbols-outlined select-none", filled && "ms-fill", className)}
      style={style}
    >
      {name}
    </span>
  );
}
