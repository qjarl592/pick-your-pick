"use client";

import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/common/Logo";

export default function Footer() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <footer className="bg-blue-900 px-4 py-12 text-blue-100 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="grid gap-12 md:grid-cols-3 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={staggerItem}>
            <Logo className="mb-4" />
            <p className="max-w-xs">음악가들의 연습을 더 효율적으로 만들기 위한 디지털 악보 관리 플랫폼</p>
            <motion.div className="mt-6 flex space-x-4">
              <Link href="#" className="hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-white">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="hover:text-white">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="mb-4 text-lg font-medium text-white">서비스</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="hover:text-white">
                  기능
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/score" className="hover:text-white">
                  악보 관리
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  프리미엄 플랜
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="mb-4 text-lg font-medium text-white">회사</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white">
                  소개
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  채용
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  연락처
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="mb-4 text-lg font-medium text-white">법적 정보</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  쿠키 정책
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 border-t border-blue-800 pt-8 text-center text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p>© {new Date().getFullYear()} Pick Your Pick. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
