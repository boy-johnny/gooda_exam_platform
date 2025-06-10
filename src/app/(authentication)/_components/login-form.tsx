import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">登入</CardTitle>
          <CardDescription>使用 Google 帳號登入</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <Image
                    src="/google-logo.svg"
                    alt="Google"
                    width={24}
                    height={24}
                  />
                  使用 Google 帳號登入
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  或繼續使用
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">密碼</Label>
                    <Link
                      href="/login/forgot-password"
                      className="ml-auto text-xs  underline-offset-4 hover:underline"
                    >
                      忘記你的密碼?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  登入
                </Button>
              </div>
              <div className="text-center text-sm">
                還沒有帳號嗎?{" "}
                <Link
                  href="/register"
                  className=" underline underline-offset-4"
                >
                  立即註冊
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        點擊繼續
        <br />
        即表示您同意我們的 <Link href="#">服務條款</Link> 和{" "}
        <Link href="#">隱私政策</Link>。
      </div>
    </div>
  );
}
