import { FONT_UI } from "@/styles/fonts";
import C from "@/styles/colors";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] mb-5"
      style={{
        background: C.gradSubtle,
        color: C.violet,
        border: "1px solid rgba(109,40,217,0.25)",
        fontFamily: FONT_UI,
      }}
    >
      <span style={{ color: C.pink }}>✦</span> {children}
    </p>
  );
}

export default SectionLabel;
