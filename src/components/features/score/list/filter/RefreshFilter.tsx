import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useScoreFilterStore } from "@/store/scoreFilterStore";

export default function RefreshFilter() {
  const clearFilter = useScoreFilterStore((state) => state.clearFilter);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div whileTap={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Button
              size="icon"
              variant="outline"
              onClick={clearFilter}
              className="size-10 rounded-lg border-blue-100 bg-white text-blue-600 shadow-sm hover:bg-blue-50 hover:text-blue-700"
            >
              <RotateCw className="size-4" />
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="border-none bg-blue-800 text-white">
          <p>필터 초기화</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
