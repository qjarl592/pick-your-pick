"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="flex flex-col items-center justify-between px-4 py-20 md:flex-row md:py-32 lg:px-24">
      <motion.div
        className="mb-10 flex flex-col space-y-6 md:mb-0 md:w-1/2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight text-blue-700 md:text-5xl lg:text-6xl"
          variants={itemVariants}
        >
          당신의 연주를 위한 <br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            최고의 악보 관리
          </span>
        </motion.h1>
        <motion.p className="max-w-md text-lg text-blue-700" variants={itemVariants}>
          선택하고, 연습하고, 성장하세요. Pick Your Pick은 음악가들의 연습 여정을 더 효율적으로 만들어 줍니다.
        </motion.p>
        <motion.div
          className="flex flex-col space-y-3 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          variants={itemVariants}
        >
          <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700" asChild>
            <Link href="/score">
              시작하기 <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            asChild
          >
            <Link href="#features">기능 살펴보기</Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        className="relative md:w-1/2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.4 }}
      >
        <motion.div
          className="relative h-[400px] w-full rounded-lg shadow-xl md:h-[500px]"
          whileHover={{
            y: -10,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/landing-hero.png"
            alt="악보 관리 앱 이미지"
            fill
            className="rounded-lg object-cover"
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
