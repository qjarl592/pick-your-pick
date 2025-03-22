import { useEffect, useRef } from "react";
import { Player } from "tone";

import useAudioTrackStore, { AudioTrackId } from "@/store/audioStore";

interface Players {
  [trackId: string]: Player;
}

// Player 인스턴스들을 저장
let playersInstance: Players | null = null;

/**
 * Tone.js Player 객체와 Zustand 상태를 연결하는 커스텀 훅
 */
export function useAudioPlayers() {
  const playersRef = useRef<Players>({});
  const {
    isPlaying,
    currentPosition,
    tracks,
    setIsPlaying,
    setCurrentPosition,
    resetPosition,
    setTrackMute,
  } = useAudioTrackStore();

  // 컴포넌트 마운트 시 플레이어 초기화
  useEffect(() => {
    // 이미 초기화된 경우 재사용
    if (playersInstance) {
      playersRef.current = playersInstance;

      // 볼륨과 음소거 상태 동기화
      Object.entries(playersInstance).forEach(([trackId, player]) => {
        const track = tracks[trackId as AudioTrackId];
        if (track) {
          player.volume.value = track.isMuted ? -Infinity : Math.log10(track.volume) * 20;
        }
      });

      return;
    }

    // 각 트랙별 Player 생성
    const newPlayers: Players = {};

    // TODO: 파일 url 변경
    Object.keys(tracks).forEach((trackId) => {
      newPlayers[trackId] = new Player({
        url: `/audio/${trackId}.mp3`,
        autostart: false,
        onload: () => console.log(`${trackId} loaded`),
      }).toDestination();
    });

    // 인스턴스 저장
    playersRef.current = newPlayers;
    playersInstance = newPlayers;

    // 언마운트 시 정리
    return () => {
      // 애플리케이션 종료 시에만 정리
    };
  }, [tracks]);

  // 재생/일시정지 토글
  const togglePlayPause = () => {
    if (isPlaying) {
      // 일시정지: 플레이어에서 위치 가져오기
      let position = 0;
      for (const player of Object.values(playersRef.current)) {
        if (player.state === "started") {
          position = player.immediate();
          break;
        }
      }

      // 모든 플레이어 정지
      Object.values(playersRef.current).forEach((player) => {
        player.stop();
      });

      // 위치 저장
      setCurrentPosition(position);
      setIsPlaying(false);
    } else {
      // 모든 플레이어 재생
      Object.values(playersRef.current).forEach((player) => {
        if (currentPosition > 0) {
          player.start(undefined, currentPosition);
        } else {
          player.start();
        }
      });

      setIsPlaying(true);
    }
  };

  // 정지
  const toggleStop = () => {
    Object.values(playersRef.current).forEach((player) => {
      player.stop();
    });

    resetPosition();
    setIsPlaying(false);
  };

  const toggleTrackMute = (trackId: AudioTrackId) => {
    setTrackMute(trackId);
  };

  return {
    togglePlayPause,
    toggleStop,
    toggleTrackMute,
    isPlaying,
    currentPosition,
    tracks,
  };
}
