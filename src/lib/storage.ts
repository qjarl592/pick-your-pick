/**
 * Storage URL 생성 유틸리티
 * 구조: {userId}/{scoreId}/fileName
 */

const WORKER_URL = "https://pick-your-pick.jinwonmusicdev.workers.dev";

export type AudioTrackType = "bass" | "drum" | "guitar" | "others" | "piano" | "vocal";

/**
 * Storage 파일 URL 생성
 */
function getStorageUrl(userId: string, scoreId: string, fileName: string): string {
  return `${WORKER_URL}/${userId}/${scoreId}/${fileName}`;
}

/**
 * 오디오 파일 URL 생성
 */
function getAudioUrl(userId: string, scoreId: string, trackType: AudioTrackType): string {
  return getStorageUrl(userId, scoreId, `${trackType}.mp3`);
}

/**
 * 악보 PDF URL 생성
 */
export function getScoreUrl(userId: string, scoreId: string, updatedAt: Date): string {
  const dateObj = typeof updatedAt === "string" ? new Date(updatedAt) : updatedAt;
  const timestamp = dateObj.getTime();

  const url = `${WORKER_URL}/${userId}/${scoreId}/score.pdf?updated=${timestamp}`;

  return url;
}

/**
 * 모든 오디오 트랙 URL 생성
 */
export function getAllAudioUrls(userId: string, scoreId: string): Record<AudioTrackType, string> {
  const tracks: AudioTrackType[] = ["bass", "drum", "guitar", "others", "piano", "vocal"];

  return tracks.reduce(
    (acc, track) => ({
      ...acc,
      [track]: getAudioUrl(userId, scoreId, track),
    }),
    {} as Record<AudioTrackType, string>
  );
}
