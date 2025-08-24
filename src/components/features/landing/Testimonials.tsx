"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 0,
    name: "김민지",
    role: "피아니스트",
    content:
      "Pick Your Pick 덕분에 연습 시간이 훨씬 효율적으로 변했어요. 더 이상 악보를 찾느라 시간을 낭비하지 않아도 됩니다.",
    avatar: "/avatar1.png",
  },
  {
    id: 1,
    name: "이준호",
    role: "기타리스트",
    content:
      "난이도별로 악보를 관리할 수 있어서 체계적인 연습이 가능해졌습니다. 유튜브 연동 기능도 정말 유용해요!",
    avatar: "/avatar2.png",
  },
  {
    id: 2,
    name: "박수현",
    role: "바이올리니스트",
    content:
      "디지털로 악보를 관리하면서 연습 효율이 크게 향상되었습니다. 특히 PDF 뷰어 기능이 정말 편리합니다.",
    avatar: "/avatar3.png",
  },
];

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="bg-gray-50 px-4 py-20 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">사용자 후기</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Pick Your Pick을 사용한 음악가들의 실제 경험을 확인하세요.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`testimonial-${testimonial.id}`}
              className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="mb-4 flex space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                {[...Array(5)]
                  .map((_, i) => i)
                  .map((i) => (
                    <motion.div
                      key={`star-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 + index * 0.1 }}
                    >
                      <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
              </motion.div>
              <motion.p
                className="mb-6 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                "{testimonial.content}"
              </motion.p>
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <motion.div
                  className="relative size-12 overflow-hidden rounded-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
