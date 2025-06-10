import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link href="/">
    <div className="flex items-center">
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <h1 className="text-xl font-bold">GOODA</h1>
    </div>
  </Link>
);
