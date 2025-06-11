import "@/app/globals.css";

import { Navbar } from "./_components/navbar/navbar";
import Footer from "./_components/footer/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <div className="flex h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </main>
  );
}
