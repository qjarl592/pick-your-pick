"use client";

import { motion } from "framer-motion";

import {
  CustomAccordion,
  CustomAccordionContent,
  CustomAccordionItem,
  CustomAccordionTrigger,
} from "./CustomAccordion";

const faqs = [
  {
    id: 0,
    question: "Pick Your Pick은 어떤 서비스인가요?",
    answer:
      "Pick Your Pick은 음악가와 연주자를 위한 디지털 악보 관리 플랫폼입니다. 악보를 쉽게 정리하고, 검색하고, 연습할 수 있는 다양한 기능을 제공합니다.",
  },
  {
    id: 1,
    question: "어떤 형식의 악보를 업로드할 수 있나요?",
    answer: "현재는 PDF 형식의 악보만 지원하고 있습니다. 이는 대부분의 디지털 악보 형식과 호환됩니다.",
  },
  {
    id: 2,
    question: "유튜브 연동은 어떻게 작동하나요?",
    answer:
      "악보를 추가할 때 유튜브에서 관련 연주 영상을 검색하여 악보와 연결할 수 있습니다. 이렇게 하면 연습할 때 참고할 수 있는 연주 영상을 쉽게 찾을 수 있습니다.",
  },
  {
    id: 3,
    question: "모바일에서도 사용할 수 있나요?",
    answer:
      "네, Pick Your Pick은 모바일 환경에 최적화되어 있습니다. 어디서든 악보에 접근하고 연습할 수 있습니다.",
  },
  {
    id: 4,
    question: "악보 저장에 제한이 있나요?",
    answer:
      "기본 계정은 일정량의 저장 공간을 제공합니다. 더 많은 저장 공간이 필요하신 경우 프리미엄 플랜으로 업그레이드할 수 있습니다.",
  },
  {
    id: 5,
    question: "오프라인에서도 악보를 볼 수 있나요?",
    answer:
      "네, 한 번 열어본 악보는 캐시에 저장되어 오프라인에서도 접근 가능합니다. 단, 새로운 악보를 추가하거나 변경사항을 적용하려면 인터넷 연결이 필요합니다.",
  },
];

export default function FAQ() {
  return (
    <section className="px-4 py-20 lg:px-24" id="faq">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">자주 묻는 질문</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Pick Your Pick에 대해 가장 많이 받는 질문들에 대한 답변입니다.
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <CustomAccordion type="multiple" className="w-full">
            {faqs.map((faq) => (
              <motion.div
                key={`faq-motion-${faq.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + faq.id * 0.1 }}
              >
                <CustomAccordionItem value={`item-${faq.id}`}>
                  <CustomAccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </CustomAccordionTrigger>
                  <CustomAccordionContent className="text-gray-600">{faq.answer}</CustomAccordionContent>
                </CustomAccordionItem>
              </motion.div>
            ))}
          </CustomAccordion>
        </motion.div>
      </div>
    </section>
  );
}
