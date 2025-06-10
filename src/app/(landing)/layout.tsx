import { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";

const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GOODA | 最優質的考試平台",
  description: "GOODA 考試平台",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.png",
        href: "/logo.png",
      },
    ],
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={notoSansTC.className}>
        <main className="h-screen w-full">
          <div className="flex h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
