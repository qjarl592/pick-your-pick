import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAudioRecorder } from "@/hooks/useAudioRecorder/useAudioRecorder";
import { useRecordStore } from "@/store/recordStore";

import TracksContainer from "./TracksContainer";

const ORIGINAL_AUDIO_URL =
  "https://aesedyevxercqigjbuli.supabase.co/storage/v1/object/public/Score/audio/test_user/original.mp3";

export default function RecordController() {
  const {
    inputDevices,
    selectedDevice,
    isRecording,
    audioURL,
    recordingStartTime,
    setSelectedDevice,
    toggleRecording,
  } = useAudioRecorder();

  const { isPlay, setIsPlay } = useRecordStore();

  // 내부에 상태 및 참조 추가
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const prevAudioUrlRef = useRef<string>("");

  // audioURL 변경 감지 효과 추가
  useEffect(() => {
    // 이전과 다른 URL인 경우에만 업데이트
    if (audioURL && audioURL !== prevAudioUrlRef.current) {
      prevAudioUrlRef.current = audioURL;
      setRecordingUrl(audioURL);
    }
  }, [audioURL, recordingStartTime]);

  // 녹음 시작 시 재생 중지
  useEffect(() => {
    if (isRecording && isPlay) {
      setIsPlay(false);
    }
  }, [isRecording, isPlay, setIsPlay]);

  const handleChangeValue = (value: string) => {
    setSelectedDevice(value);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border-2 p-4">
      <div className="flex items-center space-x-4">
        <Select onValueChange={handleChangeValue} disabled={isRecording}>
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
        <Button
          onClick={toggleRecording}
          disabled={!selectedDevice}
          variant={isRecording ? "destructive" : "default"}
        >
          {isRecording ? "중지" : "녹음"}
        </Button>
      </div>
      <Separator />

      <TracksContainer
        originalUrl={ORIGINAL_AUDIO_URL}
        recordingUrl={recordingUrl || null}
        isRecording={isRecording}
        recordingStartTime={recordingStartTime}
      />
    </div>
  );
}
