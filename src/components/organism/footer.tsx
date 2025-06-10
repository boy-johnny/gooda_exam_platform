interface FooterProps {
  mainLinks: Array<{
    name: string;
    href: string;
  }>;
  socialLinks: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
  }>;
  copyrightText: string;
}

export default function Footer({
  mainLinks,
  socialLinks,
  copyrightText,
}: FooterProps) {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {mainLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-600">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
}
