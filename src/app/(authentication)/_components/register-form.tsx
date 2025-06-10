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

/**
 * 註冊表單組件
 * @param className - 自定義樣式類名
 * @param props - 其他 HTML div 屬性
 */
export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">註冊</CardTitle>
          <CardDescription>使用 Google 帳號註冊</CardDescription>
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
                  使用 Google 帳號註冊
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
                  <Label htmlFor="password">密碼</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">確認密碼</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  註冊
                </Button>
              </div>
              <div className="text-center text-sm">
                已經有帳號了嗎?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  立即登入
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
