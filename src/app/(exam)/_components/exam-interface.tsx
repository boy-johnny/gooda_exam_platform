// 檔案路徑: components/quiz-interface.tsx
"use client";

import React, { useState, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

// Shadcn UI & Lucide Icons
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Bookmark, Clock, ListOrdered, X } from "lucide-react";

// 模擬 80 題的大量測驗資料
const quizData = {
  id: "session05",
  title: "大型綜合能力測驗",
  subject: "綜合科學與人文",
  totalQuestions: 80,
  durationInSeconds: 5400, // 90 分鐘
  questions: Array.from({ length: 80 }, (_, i) => ({
    id: `q${i + 1}`,
    questionText: `這是第 ${
      i + 1
    } 題的題目內容。虛擬化渲染能確保即使在大量題目下，頁面依然流暢。`,
    options: [
      { id: "a", text: "選項 A" },
      { id: "b", text: "選項 B" },
      { id: "c", text: "選項 C" },
      { id: "d", text: "選項 D" },
    ],
  })),
};

// -----------------------------------------------------------------------------
// 浮動題數面板 (調整後：純面板，由父元件控制)
// -----------------------------------------------------------------------------
const FloatingQuestionPanel = ({
  questions,
  answers,
  flaggedQuestions,
  onQuestionSelect,
  onClose,
}: {
  questions: {
    id: string;
    questionText: string;
    options: { id: string; text: string }[];
  }[];
  answers: Record<string, string>;
  flaggedQuestions: string[];
  onQuestionSelect: (index: number) => void;
  onClose: () => void;
}) => {
  const getButtonVariant = (qId: string) => {
    if (flaggedQuestions.includes(qId)) return "destructive";
    if (answers[qId]) return "default";
    return "secondary";
  };

  return (
    <Card className="fixed bottom-4 right-4 z-30 w-80 shadow-2xl transition-all duration-300">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg">所有題目</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
      </CardHeader>
      <CardContent className="max-h-80 overflow-y-auto">
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, index) => (
            <Button
              key={q.id}
              variant={getButtonVariant(q.id)}
              className="aspect-square"
              onClick={() => onQuestionSelect(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// -----------------------------------------------------------------------------
// 主測驗介面
// -----------------------------------------------------------------------------
export function ExamInterface() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [isDesktopPanelOpen, setIsDesktopPanelOpen] = useState(false); // <--- 新增狀態來控制桌面面板

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: quizData.questions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 380, // 預估高度，包含卡片和間距
    overscan: 5,
  });

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleQuestionSelect = (index: number) => {
    rowVirtualizer.scrollToIndex(index, { align: "start" });
  };

  return (
    <div className="flex min-h-screen flex-col mx-auto bg-gray-50">
      {/* 頂部靜態資訊區 */}
      <div className="max-w-full mx-auto">
        <header className="shrink-0 p-4">
          <Card>
            <CardContent className="hidden md:grid grid-cols-4 gap-4 text-sm">
              <p>
                <strong>考試名稱:</strong> {quizData.title}
              </p>
              <p>
                <strong>考試科目:</strong> {quizData.subject}
              </p>
              <p>
                <strong>總題數:</strong> {quizData.totalQuestions}
              </p>
              <p>
                <strong>考試時間:</strong> {quizData.durationInSeconds / 60}{" "}
                分鐘
              </p>
            </CardContent>
            <div className="md:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="info">
                  <AccordionTrigger>測驗詳細資訊</AccordionTrigger>
                  <AccordionContent className="space-y-2 px-1">
                    <p>
                      <strong>考試名稱:</strong> {quizData.title}
                    </p>
                    <p>
                      <strong>考試科目:</strong> {quizData.subject}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Card>
        </header>

        {/* 置頂狀態列 */}
        <div className="sticky top-0 z-20 shrink-0 bg-gray-50/80 backdrop-blur-sm p-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>剩餘時間: 89:13</span>
            </div>
            <div className="w-1/2">
              <Progress
                value={
                  (Object.keys(answers).length / quizData.totalQuestions) * 100
                }
              />
            </div>
            {/* --- 統一的面板觸發器區塊 --- */}
            <div className="flex items-center gap-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <ListOrdered size={16} />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-center">
                    <DrawerTitle>所有題目</DrawerTitle>
                    <DrawerDescription>
                      點擊題號可以快速跳轉。
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pt-0 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-5 gap-2">
                      {quizData.questions.map((q, index) => (
                        <Button
                          key={q.id}
                          variant={
                            flaggedQuestions.includes(q.id)
                              ? "destructive"
                              : answers[q.id]
                              ? "default"
                              : "secondary"
                          }
                          className="aspect-square"
                          onClick={() => handleQuestionSelect(index)}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
              <Button
                variant="outline"
                className="hidden md:flex"
                onClick={() => setIsDesktopPanelOpen(true)}
              >
                <ListOrdered size={16} className="mr-2" />
                所有題目
              </Button>
            </div>
          </div>
        </div>

        {/* 主內容區域 (可滾動) */}
        <main ref={parentRef} className="flex-1 overflow-y-auto px-2">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const q = quizData.questions[virtualItem.index];
              const isFlagged = flaggedQuestions.includes(q.id);

              return (
                <div
                  key={q.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                    padding: "12px 8px", // <--- 修改處：增加了垂直 padding 來製造間距
                  }}
                >
                  <Card>
                    {" "}
                    {/* <--- 修改處：移除了 mb-6 */}
                    <CardHeader className="flex items-center justify-between">
                      <div>
                        <CardTitle>Question {virtualItem.index + 1}</CardTitle>
                        <CardDescription className="mt-1">
                          {q.questionText}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleFlag(q.id)}
                      >
                        <Bookmark
                          className={
                            isFlagged ? "fill-blue-600 text-blue-600" : ""
                          }
                        />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={answers[q.id] || ""}
                        onValueChange={(value) =>
                          handleAnswerSelect(q.id, value)
                        }
                      >
                        <div className="space-y-3">
                          {q.options.map((option) => (
                            <Label
                              key={option.id}
                              htmlFor={`${q.id}-${option.id}`}
                              className={`flex items-center p-4 border rounded-md cursor-pointer transition-all hover:bg-gray-50 ${
                                answers[q.id] === option.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200"
                              }`}
                            >
                              <RadioGroupItem
                                value={option.id}
                                id={`${q.id}-${option.id}`}
                              />
                              <span className="ml-3">{option.text}</span>
                            </Label>
                          ))}
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </main>

        {/* 桌面版浮動題數面板的條件渲染 */}
        {isDesktopPanelOpen && (
          <div className="hidden md:block">
            <FloatingQuestionPanel
              questions={quizData.questions}
              answers={answers}
              flaggedQuestions={flaggedQuestions}
              onQuestionSelect={handleQuestionSelect}
              onClose={() => setIsDesktopPanelOpen(false)} // <--- 傳入關閉函式
            />
          </div>
        )}
      </div>
    </div>
  );
}
