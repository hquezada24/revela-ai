import { FONT_DISPLAY } from "@/styles/fonts";
import C from "@/styles/colors";

function SectionTitle({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <h2
      className={`text-4xl md:text-5xl mb-4 leading-[1.1] ${center ? "text-center" : ""}`}
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontStyle: "italic",
        color: C.text,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

export default SectionTitle;
