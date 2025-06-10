import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-muted-foreground">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="https://gooda.com.tw" target="_blank" rel="noreferrer">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Gooda" width={100} height={100} />
              <h2 className="text-center text-xl font-bold leading-loose text-primary">
                Gooda
              </h2>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Gooda. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
