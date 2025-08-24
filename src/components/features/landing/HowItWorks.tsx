"use client";

import { motion } from "framer-motion";
import { PlusCircle, Search, Music } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    id: 0,
    icon: <PlusCircle className="size-12 text-blue-600" />,
    title: "악보 추가",
    description: "유튜브에서 곡을 검색하거나 직접 PDF 악보를 업로드하세요.",
    image: "/asset/image/score_add.png",
  },
  {
    id: 1,
    icon: <Search className="size-12 text-blue-600" />,
    title: "악보 찾기",
    description: "제목, 아티스트, 난이도로 악보를 쉽게 검색하고 필터링하세요.",
    image: "/asset/image/score_search.png",
  },
  {
    id: 2,
    icon: <Music className="size-12 text-blue-600" />,
    title: "연습 시작",
    description: "내장된 PDF 뷰어로 악보를 열고 바로 연습을 시작하세요.",
    image: "/asset/image/score_view.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-4 py-20 lg:px-24" id="how-it-works">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-blue-700 md:text-4xl">사용 방법</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Pick Your Pick은 직관적인 인터페이스로 악보 관리를 간단하게 만들어 줍니다.
          </p>
        </motion.div>

        <div className="mt-16 space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={`step-${step.id}`}
              className={`flex flex-col items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } md:gap-12`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <motion.div
                className="mb-8 flex-1 md:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
              >
                <div className="max-w-lg">
                  <motion.div
                    className="mb-6 flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.3 + 0.6 }}
                  >
                    <motion.div
                      className="rounded-full bg-blue-50 p-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-blue-700">{step.title}</h3>
                  </motion.div>
                  <p className="text-lg">{step.description}</p>
                </div>
              </motion.div>
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.3 + 0.4 }}
              >
                <motion.div
                  className="relative h-[300px] w-full overflow-hidden rounded-lg border border-blue-100 shadow-lg md:h-[400px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="bg-white object-cover"
                    unoptimized
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
