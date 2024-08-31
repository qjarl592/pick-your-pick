"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { MicIcon, PauseIcon, PlayIcon, SquareIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {};

export default function AudioRecorder({}: Props) {
  const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (inputDevices.length) return;
    (async () => {
      await getInputSources();
    })();
  }, []);

  const getInputSources = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const virtualDeviceKeywords = ["virtual"];
      const audioInputDevices = devices
        .filter((device) => device.kind === "audioinput")
        .filter((device) => device.deviceId !== "default");
      const actualAudioInputDevices = audioInputDevices.filter(
        (device) =>
          !virtualDeviceKeywords.some((keyword) =>
            device.label.toLowerCase().includes(keyword)
          )
      );
      setInputDevices(actualAudioInputDevices);
    } catch (error) {
      console.log(error);
    }
  };

  const startRecording = async () => {
    console.log(selectedDevice);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
        },
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
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
      setIsRecording(false);
    } else {
      try {
        await startRecording();
        setIsRecording(true);
        console.log("recording start!");
      } catch (error) {
        console.log("startRecording 에러", error);
      }
    }
  };

  const handleValueChange = (value: string) => {
    setSelectedDevice(value);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlay) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlay(!isPlay);
  };

  const stopWithReset = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlay(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="입력 소스를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="px-2">입력 소스</SelectLabel>
            {inputDevices.map((device) => (
              <SelectItem
                value={device.deviceId}
                key={device.deviceId}
                className="px-2"
              >
                {device.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex space-x-2">
        <button
          className="w-20 h-20 rounded-full items-center justify-center border-4 border-red-600 flex"
          onClick={toggleRecord}
        >
          <div
            className={cn(
              "bg-red-600 transition-all duration-700 ease-in-out",
              {
                "h-8 w-8 rounded-md": isRecording,
                "h-16 w-16 rounded-full": !isRecording,
              }
            )}
          ></div>
        </button>
        <div className="flex space-x-2 flex-1 justify-center items-center">
          <Button
            className="flex-1 h-16"
            variant="outline"
            disabled={!audioURL}
            onClick={togglePlayPause}
          >
            {isPlay ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button
            className="flex-1 h-16"
            variant="outline"
            disabled={!audioURL}
            onClick={stopWithReset}
          >
            <SquareIcon />
          </Button>
          {audioURL && (
            <audio
              ref={audioRef}
              src={audioURL}
              onEnded={() => setIsPlay(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
