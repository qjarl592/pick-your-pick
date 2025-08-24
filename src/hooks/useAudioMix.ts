import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useCallback, useEffect, useRef, useState } from "react";

export const useAudioMix = () => {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  const loadFfmpeg = useCallback(async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
  }, []);

  const mixAudios = async (trackFiles: File[], recordFile: { file: File; volume: number } | null = null) => {
    // ffmpeg wasm not loaded
    if (!loaded) {
      throw new Error("ffmpeg is not loaded");
    }

    // 믹스할 음원이 없는 경우
    const audioNum = trackFiles.length + (recordFile ? 1 : 0);
    if (audioNum === 0) {
      throw new Error("no audio files to mix");
    }

    const ffmpeg = ffmpegRef.current;

    // wasm fs로 오디오 파일 복사
    const audioFiles = recordFile
      ? [...trackFiles.map((item) => ({ file: item, volume: 1 })), recordFile]
      : trackFiles.map((item) => ({ file: item, volume: 1 }));
    const ffmpegFiles = await Promise.all(
      audioFiles.map(async (item) => {
        const { file } = item;
        const fileName = `input_${file.name}`;
        await ffmpeg.writeFile(fileName, await fetchFile(file));
        return fileName;
      })
    );

    // wasm command
    const outputFile = "mixed_audio.mp3";
    const inputOptions = ffmpegFiles.flatMap((file) => ["-i", file]);
    const volumeFilters = audioFiles
      .map(({ volume }, index) => `[${index}:0]volume=${volume}[a${index}]`)
      .join(";");
    const mixInputs = audioFiles.map((_, index) => `[a${index}]`).join("");
    const filterComplex = `${volumeFilters};${mixInputs}amix=inputs=${audioFiles.length}:duration=longest[out]`;
    const command = [
      ...inputOptions,
      "-filter_complex",
      filterComplex,
      "-map",
      "[out]",
      "-c:a",
      "mp3",
      outputFile,
    ];
    await ffmpeg.exec(command);

    // ffmpeg fs에서 결과 파일 가져와서 url 생성
    const data = await ffmpeg.readFile(outputFile);
    const blob = new Blob([data], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);
    console.log("success!!!");

    // clean up
    ffmpegFiles.forEach(async (fileName) => {
      await ffmpeg.deleteFile(fileName);
    });
    await ffmpeg.deleteFile(outputFile); // 에러 가능성

    return url;
  };

  useEffect(() => {
    if (loaded) return;
    loadFfmpeg();
    setLoaded(true);
    console.log("load ffmpeg");
  }, [loaded, loadFfmpeg]);

  return { loaded, mixAudios };
};
