import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import { Check } from "lucide-react";

interface AuthStepIndicatorProps {
  steps: string[];
  currentStep: number; // 0-indexed
}

export default function AuthStepIndicator({
  steps,
  currentStep,
}: AuthStepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((label, i) => {
        const done = i < currentStep;
        const active = i === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                style={{
                  background: done
                    ? C.grad
                    : active
                      ? "rgba(109,40,217,0.25)"
                      : "rgba(255,255,255,0.05)",
                  border: done
                    ? "none"
                    : active
                      ? "2px solid rgba(109,40,217,0.7)"
                      : `1px solid ${C.border}`,
                  color: done ? "white" : active ? C.violet : C.muted,
                  boxShadow: active
                    ? "0 0 16px rgba(109,40,217,0.35)"
                    : "none",
                }}
              >
                {done ? <Check size={13} /> : i + 1}
              </div>
              <span
                style={{
                  fontFamily: FONT_UI,
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: active ? C.text : C.muted,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-px mx-2 transition-all duration-500"
                style={{
                  background: done
                    ? C.grad
                    : "rgba(255,255,255,0.08)",
                  marginBottom: "20px",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
