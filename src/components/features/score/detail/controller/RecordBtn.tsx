import { Mic } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import RecordController from "../recorder/RecordController";

interface Props {
  className?: string;
}

export default function RecordBtn({ className }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={cn("", className)}>
          <Mic />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="min-h-96">
        <SheetTitle className="invisible">Record Sheet</SheetTitle>
        <RecordController />
      </SheetContent>
    </Sheet>
  );
}
