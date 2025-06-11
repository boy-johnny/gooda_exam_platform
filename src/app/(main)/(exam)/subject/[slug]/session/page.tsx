import SessionTable from "@/app/(main)/(exam)/_components/session-table";
import { createClient } from "@/lib/supabase/client";

export default async function SessionPage() {
  const supabase = createClient();

  const { data: sessions, error } = await supabase
    .from("tests")
    .select("id, subject_id, name, description, year, period");

  // 做一個基本的錯誤處理
  if (error) {
    console.error("Error fetching tests:", error);
    // 在真實應用中，你可能會想顯示一個錯誤頁面
    // 這裡我們先簡單地傳入一個空陣列
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">無法載入測驗列表，請稍後再試。</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-screen-lg w-full px-6 md:max-w-screen-xl sm:px-10">
        <h2 className="text-2xl  md:text-3xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
          測驗列表
        </h2>
        <SessionTable initialData={sessions || []} />
      </div>
    </div>
  );
}
