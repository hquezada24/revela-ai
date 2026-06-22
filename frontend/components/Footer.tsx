import C from "@/styles/colors";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import Section from "./Section";
import { FONT_DISPLAY, FONT_UI } from "@/styles/fonts";

const FOOTER_LINKS = {
  Product: ["Features", "How It Works", "Pricing", "Gallery", "AI Stylist"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  Support: ["Contact", "Help Center", "Status"],
};

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}
    >
      <Section className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "1.5rem",
                background: C.grad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Révéla
            </span>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ fontFamily: FONT_UI, color: C.muted, maxWidth: 220 }}
            >
              AI-powered style transformation that helps you discover and
              express the best version of yourself.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[BsInstagram, BsTwitter, BsLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150 hover:bg-[rgba(109,40,217,0.4)] hover:text-text"
                  style={{
                    background: C.glass,
                    border: `1px solid ${C.border}`,
                    color: C.muted,
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ fontFamily: FONT_UI, color: C.text }}
              >
                {heading}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-text"
                      style={{
                        fontFamily: FONT_UI,
                        color: C.muted,
                        textDecoration: "none",
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <p
            className="text-xs"
            style={{ fontFamily: FONT_UI, color: C.muted }}
          >
            © {currentYear} Révéla AI, Inc. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: FONT_UI, color: C.muted }}
          >
            Made with confidence, curiosity & a lot of AI.
          </p>
        </div>
      </Section>
    </footer>
  );
}

export default Footer;
