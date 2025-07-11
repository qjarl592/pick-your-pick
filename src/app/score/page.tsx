"use client";

import { motion } from "framer-motion";
import { Music, PlusCircle, Loader2, LogOut } from "lucide-react";
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
  const userId = session?.user?.id || "";
  const { data: scores, isLoading, error, refetch } = useScores(userId);

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

  const scoreList = scores?.data;

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
          <Card className="rounded-xl border border-blue-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out">
            <div className="size-full">
              <AddTabModal onSubmitSuccess={() => refetch()}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  <PlusCircle className="text-blue-600" />
                  악보 추가
                </Button>
              </AddTabModal>
              {scoreList ? (
                <div className="h-[540px]">
                  {scoreList.length > 0 ? (
                    <ScoreListCarousel>
                      {scoreList.map((score) => (
                        <ScoreCard key={score.id} score={score} onDelete={() => refetch()} />
                      ))}
                    </ScoreListCarousel>
                  ) : (
                    <p className="flex size-full items-center justify-center font-semibold text-blue-600">
                      악보 추가 버튼을 눌러 악보를 추가해보세요.
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex h-[540px] flex-col items-center justify-center">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="size-12 animate-spin text-blue-600" />
                      <p className="mt-4 font-medium text-blue-600">악보를 불러오는 중...</p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center text-center text-red-500">
                      <p className="font-medium">오류가 발생했습니다</p>
                      <p className="mt-1 text-sm">{error.toString()}</p>
                      <p className="mt-1 text-xs text-gray-500">콘솔을 확인해주세요</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center text-gray-500">
                      <p className="font-medium">악보가 없습니다</p>
                      <p className="mt-1 text-sm">처음 악보를 추가해보세요!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
