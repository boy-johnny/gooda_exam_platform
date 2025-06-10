import Image from "next/image";

export const Logo = () => (
  <div className="flex items-center">
    <Image src="/logo.png" alt="logo" width={100} height={100} />
    <h1 className="text-xl font-bold">GOODA</h1>
  </div>
);
