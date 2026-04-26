import Image from "next/image";

const LINKEDIN = "https://www.linkedin.com/company/netterai";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <a
            href="#top"
            className="inline-flex items-center"
            aria-label="Netter — home"
          >
            <Image
              src="/Netter-Logo-Text.png"
              alt="Netter"
              width={3181}
              height={720}
              className="h-6 w-auto"
            />
          </a>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-secondary">
            <a
              href="#contact"
              className="hover:text-text transition-colors"
            >
              Contact
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-text transition-colors group"
              aria-label="Netter on LinkedIn"
            >
              <Image
                src="/Logo LinkedIn.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] rounded-[3px] opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span>LinkedIn</span>
            </a>
          </nav>

          <div className="text-sm text-tertiary">© 2026 Netter</div>
        </div>
      </div>
    </footer>
  );
}
