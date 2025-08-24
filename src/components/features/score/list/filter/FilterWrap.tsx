import { motion } from "framer-motion";

import DifficultyFilter from "./DifficultyFilter";
import RecordingFilter from "./RecordingFilter";
import RefreshFilter from "./RefreshFilter";
import SortSelector from "../SortSelector";

export default function FilterWrap() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex w-full flex-col items-center justify-between gap-4 rounded-xl border border-blue-100 bg-white/80 p-4 shadow-md backdrop-blur-sm md:flex-row"
    >
      <div className="w-full md:w-auto">
        <p className="mb-2 text-sm font-semibold text-blue-700">난이도 필터</p>
        <DifficultyFilter />
      </div>

      <div className="mt-4 flex w-full flex-wrap items-center gap-4 md:mt-0 md:w-auto md:flex-nowrap">
        <div>
          <p className="mb-2 text-sm font-semibold text-blue-700">녹음 유무</p>
          <RecordingFilter />
        </div>

        <div className="flex items-end gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-700">정렬 방식</p>
            <SortSelector />
          </div>

          <div className="flex h-full items-end pb-0.5">
            <RefreshFilter />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
