import { useState, useRef, useEffect, useCallback } from "react";

import { AUDIO_MIME_TYPE } from "@/constants/recorder";

export type AudioDevice = MediaDeviceInfo;

interface UseAudioRecorderReturn {
  inputDevices: AudioDevice[];
  selectedDevice: string | null;
  isRecording: boolean;
  audioURL: string;
  setSelectedDevice: (deviceId: string) => void;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  toggleRecording: () => Promise<void>;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [inputDevices, setInputDevices] = useState<AudioDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 오디오 입력 장치 가져오기
  const fetchAudioDevices = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputDevices = devices.filter((device) => device.kind === "audioinput");
      setInputDevices(audioInputDevices);
    } catch (error) {
      console.error("오디오 입력 장치 가져오기 오류:", error);
    }
  }, []);

  // 디바이스 변경 이벤트 핸들러
  const handleDeviceChange = useCallback(() => {
    fetchAudioDevices();
  }, [fetchAudioDevices]);

  // 초기화 및 이벤트 리스너 설정
  useEffect(() => {
    fetchAudioDevices();

    // 사용 가능한 장치 목록을 실시간으로 업데이트
    const mediaDevices = navigator.mediaDevices;
    if (mediaDevices) {
      mediaDevices.addEventListener("devicechange", handleDeviceChange);
      return () => {
        mediaDevices.removeEventListener("devicechange", handleDeviceChange);
      };
    }
  }, [fetchAudioDevices, handleDeviceChange]);

  // 미디어 스트림 가져오기
  const getMediaStream = useCallback(async () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
      },
    });
  }, [selectedDevice]);

  // 녹음 시작
  const startRecording = useCallback(async () => {
    try {
      const stream = await getMediaStream();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // 데이터 수집 이벤트 핸들러
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // 녹음 중지 이벤트 핸들러
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: AUDIO_MIME_TYPE });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("녹음 시작 오류:", error);
    }
  }, [getMediaStream]);

  // 녹음 중지
  const stopRecording = useCallback(() => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);

      // 트랙 정리
      const stream = mediaRecorder.stream;
      stream.getTracks().forEach((track) => track.stop());
    }
  }, [isRecording]);

  // 녹음 토글
  const toggleRecording = useCallback(async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    inputDevices,
    selectedDevice,
    isRecording,
    audioURL,
    setSelectedDevice,
    startRecording,
    stopRecording,
    toggleRecording,
  };
}
