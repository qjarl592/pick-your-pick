"use client";

import { motion } from "framer-motion";
import { Music, PlusCircle, Loader2, LogOut } from "lucide-react";
import { nanoid } from "nanoid";
import { useSession, signOut } from "next-auth/react";

import AddTabModal from "@/components/AddTabModal/AddTabModal";
import Logo from "@/components/common/Logo";
import FilterWrap from "@/components/features/list/FilterWrap";
import ScoreCard from "@/components/features/list/ScoreCard";
import ScoreListCarousel from "@/components/features/list/ScoreListCarousel";
import SearchBar from "@/components/features/list/SearchBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScores } from "@/hooks/useStores/useStores";

export default function Page() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: scores, isLoading } = useScores(session?.user?.id || "");

  if (sessionStatus === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        <Loader2 className="size-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8 flex w-full flex-col items-center gap-6"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex-1"></div>
            <div className="mb-2 flex items-center gap-3">
              <Music className="size-10 text-blue-600" />
              <Logo size="lg" />
            </div>
            <div className="flex flex-1 justify-end">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 size-4" />
                로그아웃
              </Button>
            </div>
          </div>
          <p className="max-w-2xl text-center text-blue-700">
            악보를 검색하고 관리하여 연주 실력을 향상시켜보세요
          </p>

          <div className="mt-4 w-full max-w-2xl">
            <SearchBar />
          </div>

          <div className="mt-4 w-full max-w-5xl">
            <FilterWrap />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="rounded-xl border border-blue-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
            {scores ? (
              <ScoreListCarousel>
                <AddTabModal>
                  <Card className="group relative flex h-60 w-44 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 transition-all hover:cursor-pointer hover:border-blue-400 hover:shadow-md">
                    <div className="rounded-full bg-blue-100 p-4 transition-colors group-hover:bg-blue-200">
                      <PlusCircle size={48} className="text-blue-600" />
                    </div>
                    <span className="font-medium text-blue-700">악보 추가</span>
                  </Card>
                </AddTabModal>

                {scores.data?.map((score) => <ScoreCard key={nanoid()} score={score} />)}
              </ScoreListCarousel>
            ) : (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                {isLoading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="mb-3 size-10 animate-spin text-blue-600" />
                    <p className="font-medium text-blue-600">악보를 불러오는 중...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-red-500">
                    <p className="font-medium">오류가 발생했습니다</p>
                    <p className="mt-1 text-sm">잠시 후 다시 시도해주세요</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
