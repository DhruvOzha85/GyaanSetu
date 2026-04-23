import { Icon } from "@/components/Icon";

export function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
}) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl py-16 px-8 text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-fixed text-on-primary-fixed grid place-items-center mb-5">
        <Icon name={icon} className="text-3xl" />
      </div>
      <h3 className="text-xl font-black text-on-surface mb-2">{title}</h3>
      {description && <p className="text-on-surface-variant max-w-md mx-auto text-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
