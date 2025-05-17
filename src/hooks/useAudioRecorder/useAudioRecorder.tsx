import { useState, useRef, useEffect, useCallback } from "react";
import * as Tone from "tone";

import { AUDIO_MIME_TYPE } from "@/constants/recorder";

export type AudioDevice = MediaDeviceInfo;

interface UseAudioRecorderReturn {
  inputDevices: AudioDevice[];
  selectedDevice: string | null;
  isRecording: boolean;
  audioURL: string;
  recordingStartTime: number;
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
  const [recordingStartTime, setRecordingStartTime] = useState<number>(0);

  // Tone.js 관련 참조
  const micRef = useRef<Tone.UserMedia | null>(null);
  const recorderRef = useRef<Tone.Recorder | null>(null);

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

    // Recorder 초기화
    recorderRef.current = new Tone.Recorder();

    // 사용 가능한 장치 목록을 실시간으로 업데이트
    const mediaDevices = navigator.mediaDevices;
    if (mediaDevices) {
      mediaDevices.addEventListener("devicechange", handleDeviceChange);
      return () => {
        mediaDevices.removeEventListener("devicechange", handleDeviceChange);

        // 리소스 정리
        if (micRef.current) {
          micRef.current.close();
        }
        if (recorderRef.current) {
          recorderRef.current.dispose();
        }
      };
    }
  }, [fetchAudioDevices, handleDeviceChange]);

  // 녹음 시작
  const startRecording = useCallback(async () => {
    try {
      await Tone.start();

      // 이전 마이크 연결 해제
      if (micRef.current) {
        micRef.current.close();
      }

      // 새 마이크 인스턴스 생성
      const mic = new Tone.UserMedia();
      await mic.open();

      // if (selectedDevice) {
      //   await mic.open({ deviceId: selectedDevice });
      // } else {
      //   await mic.open();
      // }

      // 마이크를 레코더에 연결
      mic.connect(recorderRef.current!);
      micRef.current = mic;

      // 현재 Tone.js 재생 위치를 저장
      const currentPosition = Tone.Transport.seconds;
      setRecordingStartTime(currentPosition);

      // 레코더 시작
      recorderRef.current!.start();
      setIsRecording(true);
    } catch (error) {
      console.error("녹음 시작 오류:", error);
    }
  }, []);

  // 녹음 중지 및 처리
  const stopRecording = useCallback(async () => {
    if (!isRecording || !recorderRef.current || !micRef.current) return;

    try {
      // 레코더 중지 및 녹음 데이터 가져오기
      const recordingData = await recorderRef.current.stop();

      // 마이크 닫기
      micRef.current.close();

      // 녹음 데이터를 URL로 변환
      const recordingBlob = new Blob([recordingData], { type: AUDIO_MIME_TYPE });
      const recordingUrl = URL.createObjectURL(recordingBlob);

      // 처리된 오디오 URL 설정
      setAudioURL(recordingUrl);
      setIsRecording(false);
    } catch (error) {
      console.error("녹음 중지 오류:", error);
      setIsRecording(false);
    }
  }, [isRecording]);

  // 녹음 토글
  const toggleRecording = useCallback(async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    inputDevices,
    selectedDevice,
    isRecording,
    audioURL,
    recordingStartTime,
    setSelectedDevice,
    startRecording,
    stopRecording,
    toggleRecording,
  };
}
