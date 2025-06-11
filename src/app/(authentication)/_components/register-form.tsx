"use client";

import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  // 將 useAuth 提供的 setError 重新命名以避免衝突
  const { isLoading, error: authError, signUp, signInWithOAuth } = useAuth();
  // 為前端驗證建立獨立的錯誤狀態
  const [formError, setFormError] = React.useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // 優先處理前端驗證
    if (password !== confirmPassword) {
      setFormError("兩次輸入的密碼不一致");
      return;
    }
    setFormError(null); // 清除前端錯誤

    const { success } = await signUp({ email, password });
    if (success) {
      alert("註冊成功！請檢查您的電子郵件以完成驗證。");
      // 可以選擇清空表單
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <form onSubmit={handleRegister} noValidate>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">註冊</CardTitle>
            <CardDescription>使用 Google 帳號快速開始</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  formNoValidate
                  variant="outline"
                  className="w-full"
                  onClick={() => signInWithOAuth("google")}
                  disabled={isLoading}
                >
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
                  或繼續使用電子郵件
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">密碼</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">確認密碼</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {/* 顯示前端或後端的錯誤 */}
                {(formError || authError) && (
                  <p className="text-red-500">{formError || authError}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "建立帳號"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                已經有帳號了嗎?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  立即登入
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
