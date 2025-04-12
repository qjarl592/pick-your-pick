// src/components/RecordController/RecordController.tsx
import React from "react";

import { useAudioRecorder } from "@/hooks/useAudioRecorder/useAudioRecorder";
import { useRecordStore } from "@/store/recordStore";

import WaveformTrack from "./WaveformTrack";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

export default function RecordController() {
  const { inputDevices, selectedDevice, isRecording, audioURL, setSelectedDevice, toggleRecording } =
    useAudioRecorder();
  const { isPlay, setIsPlay } = useRecordStore();

  const handleChangeValue = (value: string) => {
    setSelectedDevice(value);
  };

  const handleClickPlay = () => {
    setIsPlay(!isPlay);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border-2 p-4">
      <div className="flex items-center space-x-4">
        <Select onValueChange={handleChangeValue}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="입력 소스를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="px-2">입력 소스</SelectLabel>
              {inputDevices.length === 0 ? (
                <SelectItem value="no-devices" disabled>
                  감지된 장치가 없습니다
                </SelectItem>
              ) : (
                inputDevices.map((device) => (
                  <SelectItem value={device.deviceId} key={device.deviceId} className="px-2">
                    {device.label || `마이크 ${device.deviceId.substring(0, 5)}...`}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={toggleRecording} disabled={!selectedDevice}>
          {isRecording ? "중지" : "녹음"}
        </Button>
        <Button onClick={handleClickPlay}>재생</Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <WaveformTrack
          title="원곡"
          audioUrl="https://aesedyevxercqigjbuli.supabase.co/storage/v1/object/public/Score/audio/test_user/original.mp3"
        />
        <WaveformTrack title="녹음" audioUrl={audioURL} />
      </div>
    </div>
  );
}
