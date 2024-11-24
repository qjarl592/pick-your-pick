"use client";

import { useState } from "react";

import { uploadFile } from "@/lib/supabase";

export default function GuitarProUploader() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("파일을 선택해주세요.");
      }

      const file = event.target.files[0];

      // 파일 유형 검증
      const validFileTypes = [".gp", ".gp3", ".gp4", ".gp5", ".gpx"];
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

      if (!validFileTypes.includes(fileExtension)) {
        throw new Error("유효하지 않은 파일 형식입니다. Guitar Pro 파일만 업로드 가능합니다.");
      }

      setUploading(true);
      setError(null);

      // 파일명 중복 방지를 위한 유니크 ID 생성
      const uniqueID = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const filePath = `tab/${uniqueID}-${file.name}`;

      // Supabase Storage에 업로드
      const uploadError = await uploadFile(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "파일 업로드 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">Guitar Pro 파일 업로드</label>
        <input
          type="file"
          accept=".gp,.gp3,.gp4,.gp5,.gpx"
          onChange={handleFileUpload}
          disabled={uploading}
        />
      </div>

      {uploading && <div className="text-sm text-gray-500">업로드 중...</div>}
    </div>
  );
}
