import { zodResolver } from "@hookform/resolvers/zod";
import { Star, X } from "lucide-react";
import { MouseEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export interface BaseScoreFormData {
  title: string;
  artist: string;
  difficulty: number;
  pdfFile?: File;
}

interface Props {
  schema: z.ZodSchema<BaseScoreFormData>;
  defaultValues: Partial<BaseScoreFormData>;
  onSubmit: (data: BaseScoreFormData) => void;
  submitButtonText: string;
  isPdfOptional?: boolean;
}

export function BaseScoreForm({
  schema,
  defaultValues,
  onSubmit,
  submitButtonText,
  isPdfOptional = false,
}: Props) {
  const form = useForm<BaseScoreFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const selectedPdfFile = form.watch("pdfFile");

  const handleSubmit = (values: BaseScoreFormData) => {
    onSubmit(values);
  };

  const resetFile = (e: MouseEvent) => {
    if (!pdfInputRef.current) return;
    e.preventDefault();
    form.resetField("pdfFile");
    pdfInputRef.current.value = "";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목*</FormLabel>
              <FormControl>
                <Input placeholder="곡 제목을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아티스트*</FormLabel>
              <FormControl>
                <Input placeholder="아티스트 이름을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => {
            const curValue = field.value ?? 0;

            const clickStar = (idx: number) => {
              if (curValue === idx) {
                form.resetField("difficulty");
                return;
              }
              field.onChange(idx);
            };

            return (
              <FormItem>
                <FormLabel>난이도*</FormLabel>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 })
                    .map((_, idx) => idx)
                    .map((id) => {
                      const difficulty = id + 1;
                      const isSelected = id < curValue;

                      return (
                        <button
                          key={`difficulty-input-star${id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            clickStar(difficulty);
                          }}
                        >
                          <Star
                            size={30}
                            className={isSelected ? "text-yellow-400" : "text-gray-300"}
                            fill={isSelected ? "currentColor" : "none"}
                          />
                        </button>
                      );
                    })}
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="pdfFile"
          render={({ field: { onChange, value: _value, ref: _ref, ...field } }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>PDF 파일{isPdfOptional ? "" : "*"}</FormLabel>
                <FormDescription>
                  {isPdfOptional
                    ? "새 PDF를 업로드하지 않으면 기존 파일이 유지됩니다"
                    : "PDF 파일만 업로드 가능합니다"}
                </FormDescription>
              </div>

              <FormControl>
                <Input
                  ref={pdfInputRef}
                  type="file"
                  className="w-full"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                  {...field}
                />
              </FormControl>

              {selectedPdfFile && (
                <div className="relative mt-2 rounded-md border bg-blue-50 p-3">
                  <Button className="absolute right-3 top-2 size-6 p-1" variant="ghost" onClick={resetFile}>
                    <X />
                  </Button>
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">선택된 파일:</span>
                    {selectedPdfFile.name}
                  </p>
                  <p className="text-sm text-blue-600">
                    크기: {(selectedPdfFile.size / 1024 / 1024).toFixed(2)}MB
                  </p>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{submitButtonText}</Button>
      </form>
    </Form>
  );
}
