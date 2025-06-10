// 假設這是你的頁面檔案：app/practice-session/review/page.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bookmark, CheckCircle, XCircle } from "lucide-react";

// 模擬從 API 來的測驗資料
const quizData = {
  title: "Practice Session 04",
  attemptedDate: "Dec 12, 2020 | 12:47 pm",
  timeTaken: "0:21:17",
  score: 9,
  totalQuestions: 20,
  questions: [
    {
      id: 1,
      questionText:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo?",
      options: [
        { id: "a", text: "Orange Pulps" },
        { id: "b", text: "North Pole" },
        { id: "c", text: "Antarctica" },
        { id: "d", text: "Napier, NZ" },
      ],
      userAnswerId: "c", // 使用者選了 'c'
      correctAnswerId: "b", // 正確答案是 'b'
      explanation:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sun.",
      timeTaken: "0:00:06",
      idealTime: "0:01:00",
    },
    // ... 更多問題
  ],
};

export default function ReviewPage() {
  const scorePercentage = (quizData.score / quizData.totalQuestions) * 100;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Review</h1>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">← {quizData.title}</CardTitle>
              <Button variant="outline">Unflag All Questions</Button>
            </div>
            <CardDescription>
              Attempted on {quizData.attemptedDate} | Time Taken:{" "}
              {quizData.timeTaken}
            </CardDescription>
            <div className="flex items-center gap-4 pt-4">
              <span className="font-semibold">
                Score: {quizData.score}/{quizData.totalQuestions}
              </span>
              <Progress value={scorePercentage} className="w-[40%]" />
              <span className="text-muted-foreground">
                {Math.round(scorePercentage)}%
              </span>
              <div className="ml-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Questions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Questions</SelectItem>
                    <SelectItem value="correct">Correct</SelectItem>
                    <SelectItem value="incorrect">Incorrect</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {quizData.questions.map((q, index) => (
                <AccordionItem value={`item-${q.id}`} key={q.id}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex justify-between w-full pr-4 items-start">
                      <div>
                        <p className="font-semibold mb-2">
                          Question {index + 1}
                        </p>
                        <p className="text-muted-foreground">
                          {q.questionText}
                        </p>
                      </div>
                      <Bookmark className="text-gray-400 hover:text-gray-800" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-3 mb-6">
                      {q.options.map((option) => {
                        const isCorrect = option.id === q.correctAnswerId;
                        const isUserChoice = option.id === q.userAnswerId;

                        let variant = "bg-white";
                        if (isCorrect)
                          variant =
                            "bg-green-100 border-green-400 text-green-800";
                        else if (isUserChoice && !isCorrect)
                          variant = "bg-red-100 border-red-400 text-red-800";

                        return (
                          <div
                            key={option.id}
                            className={`p-3 border rounded-md flex justify-between items-center ${variant}`}
                          >
                            <div className="flex items-center gap-3">
                              {isCorrect ? (
                                <CheckCircle size={20} />
                              ) : isUserChoice ? (
                                <XCircle size={20} />
                              ) : (
                                <div className="w-5 h-5 border rounded-full"></div>
                              )}
                              <span>{option.text}</span>
                            </div>
                            {isCorrect && (
                              <Badge variant="secondary">Right answer</Badge>
                            )}
                            {isUserChoice && !isCorrect && (
                              <Badge variant="destructive">You answered</Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <Card className="bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Explanation of the answer
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{q.explanation}</p>
                        <div className="flex gap-4 text-sm mt-4">
                          <span>
                            Time Taken:{" "}
                            <span className="font-bold">{q.timeTaken}</span>
                          </span>
                          <span>
                            Ideal Time:{" "}
                            <span className="font-bold">{q.idealTime}</span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
