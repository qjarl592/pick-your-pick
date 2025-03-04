// "use client";

// import { useState } from "react";

// import { uploadFile } from "@/lib/supabase";

// import { Input } from "../ui/input";
// import { Label } from "../ui/label";

// interface Props {
//   onFileUpload: (filePath: string) => void;
// }

// export default function GuitarProUploader(props: Props) {
//   const { onFileUpload } = props;
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error("파일을 선택해주세요.");
//       }

//       const file = event.target.files[0];

//       // 파일 유형 검증
//       const validFileTypes = [".gp", ".gp3", ".gp4", ".gp5", ".gpx"];
//       const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

//       if (!validFileTypes.includes(fileExtension)) {
//         throw new Error("유효하지 않은 파일 형식입니다. Guitar Pro 파일만 업로드 가능합니다.");
//       }

//       setUploading(true);
//       setError(null);

//       // 파일명 중복 방지를 위한 유니크 ID 생성
//       const uniqueID = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
//       const filePath = `tab/${uniqueID}-${file.name}`;

//       // Supabase Storage에 업로드
//       const uploadError = await uploadFile(filePath, file);

//       if (uploadError) {
//         throw uploadError;
//       }

//       // 성공적으로 업로드되면 파일 경로를 부모로 전달
//       onFileUpload(filePath);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "파일 업로드 중 오류가 발생했습니다.");
//       console.error(error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex-1">
//       <div className="mb-4">
//         <Label className="mb-2 block text-sm font-medium text-gray-700">Guitar Pro 파일 업로드</Label>
//         <Input
//           id="file"
//           type="file"
//           className="cursor-pointer"
//           onChange={handleFileUpload}
//           disabled={uploading}
//         />
//       </div>
//       {uploading && <div className="text-sm text-gray-500">업로드 중...</div>}
//     </div>
//   );
// }
