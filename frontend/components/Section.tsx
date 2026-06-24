function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 lg:px-10 ${className}`}>
      {children}
    </section>
  );
}

export default Section;
