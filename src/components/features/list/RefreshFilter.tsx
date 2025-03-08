import { RotateCw } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { useScoreFilterStore } from "@/store/scoreFilterStore";

export default function RefreshFilter() {
  const clearFilter = useScoreFilterStore((state) => state.clearFilter);

  return (
    <Button size="icon" variant="outline" onClick={clearFilter}>
      <RotateCw className="size-4" />
    </Button>
  );
}
