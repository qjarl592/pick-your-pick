"use client";

import { motion } from "framer-motion";
import { Music, BookOpen, Calendar, BarChart4, Search, Youtube } from "lucide-react";

const features = [
  {
    id: 0,
    icon: <BookOpen className="size-10 text-blue-600" />,
    title: "악보 관리",
    description: "모든 악보를 한 곳에서 깔끔하게 관리하고 언제든지 접근하세요.",
  },
  {
    id: 1,
    icon: <Search className="size-10 text-blue-600" />,
    title: "쉬운 검색",
    description: "제목, 아티스트, 난이도로 원하는 악보를 빠르게 찾을 수 있습니다.",
  },
  {
    id: 2,
    icon: <Calendar className="size-10 text-blue-600" />,
    title: "연습 기록",
    description: "마지막 연습일을 추적하여 꾸준한 연습 습관을 형성하세요.",
  },
  {
    id: 3,
    icon: <BarChart4 className="size-10 text-blue-600" />,
    title: "난이도 관리",
    description: "각 곡의 난이도를 설정하여 실력에 맞는 연습을 계획하세요.",
  },
  {
    id: 4,
    icon: <Youtube className="size-10 text-blue-600" />,
    title: "유튜브 연동",
    description: "유튜브에서 연주 영상을 찾아 악보와 함께 저장하세요.",
  },
  {
    id: 5,
    icon: <Music className="size-10 text-blue-600" />,
    title: "PDF 뷰어",
    description: "내장된 PDF 뷰어로 즉시 악보를 확인하고 연습을 시작하세요.",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section id="features" className="bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-20 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-blue-700 md:text-4xl">
            연주자를 위한 완벽한 기능
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Pick Your Pick은 음악가들이 연습에 집중할 수 있도록 설계된 다양한 기능을 제공합니다.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={`feature-${feature.id}`}
              className="rounded-lg border border-blue-100 bg-white p-6 shadow-md transition-all hover:shadow-lg"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="mb-4 inline-flex rounded-md bg-blue-50 p-3">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-medium text-blue-700">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
