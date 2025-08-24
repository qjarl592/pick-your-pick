"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import LoginButton from "@/components/LoginButton";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-20 text-white lg:px-24">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      >
        <motion.h2
          className="text-3xl font-bold md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          음악 연습을 더 효율적으로
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-lg opacity-90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          지금 Pick Your Pick을 시작하고 악보 관리와 연습을 한 단계 업그레이드하세요.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <LoginButton
              size="lg"
              className="border border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              지금 시작하기 <ArrowRight className="ml-2 size-4" />
            </LoginButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
