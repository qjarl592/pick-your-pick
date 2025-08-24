"use client";

import { motion } from "framer-motion";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";

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
    answer: "Pick Your Pick은 데스크톱 환경에 최적화되어 있습니다. 모바일 화면은 추후 업데이트 예정입니다.",
  },
  {
    id: 4,
    question: "악보 저장에 제한이 있나요?",
    answer: "현재 베타 버전에서는 제한 없이 이용 가능하지만, 추후 계정 당 용량 제한이 생길 수 있습니다.",
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
          <h2 className="text-3xl font-bold tracking-tight text-blue-700 md:text-4xl">자주 묻는 질문</h2>
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
          <Accordion type="multiple" className="w-full">
            {faqs.map((faq) => (
              <motion.div
                key={`faq-motion-${faq.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + faq.id * 0.1 }}
              >
                <AccordionItem value={`item-${faq.id}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
