import { SubjectCard } from "./_components/subject-card";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function SubjectPage() {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const { data: subjects, error } = await supabase
    .from("subjects")
    .select("name, slug, description")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching subjects for exam page:", error);
    // Optionally render an error message or fallback UI
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-lg w-full px-6">
        <h2 className="text-2xl md:text-3xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
          選擇你的科目
        </h2>
        <div className="mt-8 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {subjects &&
            subjects.map(
              (subject: {
                slug: string;
                name: string;
                description: string | null;
              }) => (
                <SubjectCard
                  key={subject.slug}
                  subjectName={subject.name}
                  subjectSlug={subject.slug}
                  description={subject.description || ""}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
}
