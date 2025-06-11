import SessionTable from "@/app/(main)/(exam)/_components/session-table";
import { createClient } from "@/lib/supabase/client";

export default async function SessionPage() {
  const supabase = createClient();

  // 1. 使用 Promise.all 來同時發起兩個資料請求
  const [testsResponse, chaptersResponse] = await Promise.all([
    supabase.from("tests").select("*"),
    supabase.from("chapters").select("*").order("title", { ascending: true }), // 同時按標題排序
  ]);

  // 2. 分別處理錯誤
  if (testsResponse.error || chaptersResponse.error) {
    console.error(
      "Error fetching data:",
      testsResponse.error || chaptersResponse.error
    );
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">無法載入資料，請稍後再試。</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-screen-lg w-full px-6 md:max-w-screen-xl sm:px-10">
        <h2 className="text-2xl  md:text-3xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
          測驗列表
        </h2>
        <SessionTable
          initialTests={testsResponse.data || []}
          initialChapters={chaptersResponse.data || []}
        />
      </div>
    </div>
  );
}
