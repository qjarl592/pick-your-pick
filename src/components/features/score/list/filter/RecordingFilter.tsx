"use client";

import { Music, Mic } from "lucide-react";
import { useState } from "react";

import { Switch } from "@/components/ui/switch";

export default function RecordingFilter() {
  const [enabled, setEnabled] = useState(false);

  const handleChange = (checked: boolean) => {
    setEnabled(checked);
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        {enabled ? <Mic className="size-4 text-blue-600" /> : <Music className="size-4 text-gray-500" />}
        <span className={`text-sm ${enabled ? "font-medium text-blue-600" : "text-gray-600"}`}>
          녹음 있는 악보만
        </span>
      </div>
      <Switch checked={enabled} onCheckedChange={handleChange} className="data-[state=checked]:bg-blue-600" />
    </div>
  );
}
