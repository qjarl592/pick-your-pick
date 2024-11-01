import React, { useEffect, useRef, useState } from "react";

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
  const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const { isPlay, setIsPlay } = useRecordStore();

  useEffect(() => {
    if (inputDevices.length) return;
    (async () => {
      await getInputSources();
    })();
  }, [inputDevices.length]);

  const getInputSources = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const virtualDeviceKeywords = ["virtual"];
      const audioInputDevices = devices.filter(
        (device) => device.kind === "audioinput" && device.deviceId !== "default"
      );
      const actualAudioInputDevices = audioInputDevices.filter(
        (device) => !virtualDeviceKeywords.some((keyword) => device.label.toLowerCase().includes(keyword))
      );
      setInputDevices(actualAudioInputDevices);
    } catch (error) {
      console.log(error);
    }
  };

  const handleValueChange = (value: string) => {
    setSelectedDevice(value);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
        },
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecord = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      try {
        await startRecording();
        console.log("recording start!");
      } catch (error) {
        console.log("startRecording 에러", error);
      }
    }
  };

  const handleClickPlay = () => {
    setIsPlay(!isPlay);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border-2 p-4">
      <div className="flex items-center space-x-4">
        <Select onValueChange={handleValueChange}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="입력 소스를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="px-2">입력 소스</SelectLabel>
              {inputDevices.map((device) => (
                <SelectItem value={device.deviceId} key={device.deviceId} className="px-2">
                  {device.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={toggleRecord} disabled={!selectedDevice}>
          녹음
        </Button>
        <Button onClick={handleClickPlay}>재생</Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <WaveformTrack title="원곡" audioUrl="/musics/Basket_Case.mp3" />
        <WaveformTrack title="녹음" audioUrl={audioURL} />
      </div>
    </div>
  );
}
