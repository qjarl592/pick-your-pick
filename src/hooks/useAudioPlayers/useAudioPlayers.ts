import { useEffect } from "react";
import { Player } from "tone";

import useAudioTrackStore, { AudioTrackId } from "@/store/audioStore";

// Player 인스턴스들을 저장
const players: Record<string, Player> = {};

/**
 * Tone.js Player 객체와 Zustand 상태를 연결하는 커스텀 훅
 */
export function useAudioPlayers() {
  const {
    isPlaying,
    currentPosition,
    tracks,
    setIsPlaying,
    setCurrentPosition,
    resetPosition,
    setTrackMute,
  } = useAudioTrackStore();

  // 플레이어 초기화
  useEffect(() => {
    // 각 트랙별로 플레이어가 없으면 생성
    Object.keys(tracks).forEach((trackId) => {
      if (!players[trackId]) {
        players[trackId] = new Player({
          url: `/audio/${trackId}.mp3`,
          autostart: false,
          onload: () => console.log(`${trackId} loaded`),
        }).toDestination();
      }
    });

    // 음소거 상태 동기화
    Object.entries(tracks).forEach(([trackId, track]) => {
      if (players[trackId]) {
        players[trackId].volume.value = track.isMuted ? -Infinity : 0;
      }
    });
  }, [tracks]);

  // 재생/일시정지 토글
  const togglePlayPause = () => {
    if (isPlaying) {
      // 일시정지: 플레이어에서 위치 가져오기
      let position = 0;
      for (const player of Object.values(players)) {
        if (player.state === "started") {
          position = player.immediate();
          break;
        }
      }

      // 모든 플레이어 정지
      Object.values(players).forEach((player) => {
        player.stop();
      });

      // 위치 저장
      setCurrentPosition(position);
      setIsPlaying(false);
    } else {
      // 모든 플레이어 재생
      Object.values(players).forEach((player) => {
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
    Object.values(players).forEach((player) => {
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
