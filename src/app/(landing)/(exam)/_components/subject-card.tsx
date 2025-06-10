import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export const SubjectCard = ({
  subjectName,
  subjectSlug,
  description,
}: {
  subjectName: string;
  subjectSlug: string;
  description: string;
}) => {
  return (
    <>
      <Card className="flex flex-col border rounded-xl overflow-hidden shadow-none">
        <Link href={`/exam/${subjectSlug}/session`} key={subjectSlug}>
          <CardHeader>
            <h4 className="!mt-3 text-xl font-semibold tracking-tight">
              {subjectName}
            </h4>
            <p className="mt-1 text-muted-foreground text-[17px] line-clamp-2">
              {description}
            </p>
          </CardHeader>
          <CardContent className="mt-auto px-0 pb-0 ">
            <div className="bg-muted h-40 ml-6 rounded-tl-xl" />
          </CardContent>
        </Link>
      </Card>
    </>
  );
};
