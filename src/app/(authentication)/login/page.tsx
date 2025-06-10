import Link from "next/link";
import Image from "next/image";

import { LoginForm } from "../_components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-white flex size-10 items-center justify-center rounded-md">
            <Image src="/logo.png" alt="Gooda" width={30} height={30} />
          </div>
          <h2 className="text-center text-xl font-bold leading-loose text-primary">
            GOODA
          </h2>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
