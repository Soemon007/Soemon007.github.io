/** The small label and large heading at the top of a section. */
export function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div className="reveal mb-16">
      <p className="label-mono">{label}</p>
      <h2 className="display mt-4 max-w-3xl text-[clamp(36px,5vw,64px)]">{title}</h2>
    </div>
  );
}
