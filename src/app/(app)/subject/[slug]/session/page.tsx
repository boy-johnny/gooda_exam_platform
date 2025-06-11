import SessionTable from "@/app/(app)/subject/_components/session-table";
import { createClient } from "@/lib/supabase/client";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = createClient();

  // 1. 獲取當下頁面的動態路由 來核對subject的slug
  const { data: subject, error: subjectError } = await supabase
    .from("subjects")
    .select("id, name") // 我們同時也把科目名稱拿回來，可以用在標題上
    .eq("slug", slug)
    .single(); // 我們預期只會有一筆結果，用 .single() 更精準

  if (subjectError || !subject) {
    console.error("Error fetching subject or subject not found:", subjectError);
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">科目不存在或網址錯誤。</p>
      </div>
    );
  }

  const subjectId = subject.id;

  // 3. 【第二步查詢】用 subjectId 去篩選 tests 和 chapters
  const [testsResponse, chaptersResponse] = await Promise.all([
    supabase.from("tests").select("*").eq("subject_id", subjectId),
    supabase
      .from("chapters")
      .select("*")
      .eq("subject_id", subjectId)
      .order("title", { ascending: true }),
  ]);
  if (testsResponse.error || chaptersResponse.error) {
    console.error(
      "Error fetching data:",
      testsResponse.error || chaptersResponse.error
    );
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">無法載入此科目的測驗資料，請稍後再試。</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-screen-lg w-full px-6 md:max-w-screen-xl sm:px-10">
        <h2 className="text-2xl  md:text-3xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
          {subject.name} - 測驗列表
        </h2>
        <SessionTable
          initialTests={testsResponse.data || []}
          initialChapters={chaptersResponse.data || []}
        />
      </div>
    </div>
  );
}
