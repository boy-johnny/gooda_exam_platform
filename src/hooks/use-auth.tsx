// lib/hooks/use-auth.ts 或 hooks/use-auth.ts
import * as React from "react";
import { createClient } from "@/lib/supabase/client";

function translateAuthError(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "電子郵件或密碼錯誤，請再試一次。";
  }
  if (message.includes("User already registered")) {
    return "此電子郵件已經被註冊。";
  }
  // ... 其他錯誤對應
  return "發生未知錯誤，請聯絡客服或稍後再試。";
}

export function useAuth() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const supabase = createClient();

  const handleAuth = async (authPromise: Promise<{ error: Error | null }>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await authPromise;
      if (error) throw error;
      return { success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(translateAuthError(error.message));
      } else {
        setError("發生未知錯誤，請聯絡客服或稍後再試。");
      }
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithPassword = (data: { email: string; password: string }) => {
    return handleAuth(supabase.auth.signInWithPassword(data));
  };

  const signUp = (data: { email: string; password: string }) => {
    return handleAuth(
      supabase.auth.signUp({
        ...data,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`,
        },
      })
    );
  };

  const signInWithOAuth = (provider: "google") => {
    // OAuth 是頁面跳轉，處理方式稍有不同
    setIsLoading(true);
    handleAuth(
      supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/api/auth/callback`,
        },
      })
    );
  };

  return { isLoading, error, signInWithPassword, signUp, signInWithOAuth };
}
