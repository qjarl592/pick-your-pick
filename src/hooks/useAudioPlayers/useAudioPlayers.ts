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
    setTrackMuteOthers,
    setTrackVolume,
  } = useAudioTrackStore();

  // 플레이어 초기화
  useEffect(() => {
    // 각 트랙별로 플레이어가 없으면 생성
    Object.keys(tracks).forEach((trackId) => {
      if (!players[trackId]) {
        players[trackId] = new Player({
          // 테스트용 임시 url
          url: `https://aesedyevxercqigjbuli.supabase.co/storage/v1/object/public/Score/audio/test_user/${trackId}.mp3`,
          autostart: false,
          onload: () => console.log(`${trackId} loaded`),
        }).toDestination();
      }
    });
  }, [tracks]);

  // 트랙 설정이 변경될 때만 볼륨 및 음소거 상태 업데이트
  useEffect(() => {
    Object.entries(tracks).forEach(([trackId, track]) => {
      if (players[trackId]) {
        const dbVolume = track.volume === 0 ? -Infinity : 20 * Math.log10(track.volume);
        players[trackId].volume.value = track.isMuted ? -Infinity : dbVolume;
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

  const toggleTrackMuteOthers = (trackId: AudioTrackId) => {
    setTrackMuteOthers(trackId);
  };

  const updateTrackVolume = (trackId: AudioTrackId, volume: number) => {
    // 0-1 범위에서 데시벨로 변환
    // volume 1 = 0dB (최대 볼륨)
    // volume 0.5 ≈ -6dB
    // volume 0 = -Infinity dB (무음)
    const dbVolume = volume === 0 ? -Infinity : 20 * Math.log10(volume);

    if (players[trackId]) {
      players[trackId].volume.value = dbVolume;
    }

    setTrackVolume(trackId, volume);
  };

  return {
    togglePlayPause,
    toggleStop,
    toggleTrackMute,
    toggleTrackMuteOthers,
    updateTrackVolume,
    isPlaying,
    currentPosition,
    tracks,
  };
}
