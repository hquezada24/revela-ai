type AvatarProps = {
  email: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-10 w-10 text-base",
  md: "h-12 w-12 text-lg",
  lg: "h-16 w-16 text-2xl",
};

export default function Avatar({ email, size = "md" }: AvatarProps) {
  const initial = email?.trim()?.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={`
            ${sizes[size]}
            relative flex items-center justify-center
            rounded-full
            bg-linear-to-br
            from-indigo-600
            via-violet-600
            to-fuchsia-500
            font-bold
            text-white
            
            ring-1
            ring-white/20
            shadow-[0_0_30px_rgba(139, 92, 246, 0.35)]
            backdrop-blur-xl
            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_0_40px_rgba_(139,92,246,0.5)]
            `}
    >
      <div className="absolute inset-0 bg-white/10 blur-xl"></div>
      <span className="relative z-10">{initial}</span>
    </div>
  );
}
