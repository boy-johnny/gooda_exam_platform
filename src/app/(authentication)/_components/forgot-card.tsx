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
import Link from "next/link";

/**
 * 忘記密碼表單組件
 * @param className - 自定義樣式類名
 * @param props - 其他 HTML div 屬性
 */
export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">忘記密碼?</CardTitle>
          <CardDescription>
            請輸入您的 Email
            <br />
            我們將發送重設密碼連結給您
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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
              <Button type="submit" className="w-full">
                發送重設密碼連結
              </Button>
              <div className="text-center text-sm">
                <Link href="/login" className="underline underline-offset-4">
                  返回登入
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
