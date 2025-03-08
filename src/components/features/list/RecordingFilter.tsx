"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";

export default function RecordingFilter() {
  const [enabled, setEnabled] = useState(false);

  const handleChange = (checked: boolean) => {
    setEnabled(checked);
  };

  return (
    <div className="flex items-center gap-2">
      <span>레코딩 유무</span>
      <Switch checked={enabled} onCheckedChange={handleChange} />
    </div>
  );
}
