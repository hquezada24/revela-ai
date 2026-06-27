export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth pages use their own full-screen layout — no global Header/Footer
  return <>{children}</>;
}
