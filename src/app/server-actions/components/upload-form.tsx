"use client";

import { useState } from "react";
import { uploadFile } from "../actions";

export default function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    error?: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsUploading(true);
    setUploadResult(null);

    try {
      const result = await uploadFile(formData);
      setUploadResult({
        success: true,
        fileName: result.fileName,
        fileSize: result.fileSize,
        fileType: result.fileType,
      });

      // Reset form
      const form = document.getElementById("upload-form") as HTMLFormElement;
      form?.reset();
    } catch (error) {
      setUploadResult({
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      });
    } finally {
      setIsUploading(false);
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        File Upload with Server Action
      </h3>

      {uploadResult && (
        <div
          className={`p-4 rounded mb-4 ${
            uploadResult.success
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {uploadResult.success ? (
            <div>
              <p className="font-semibold">✅ File uploaded successfully!</p>
              <p className="text-sm mt-1">
                <strong>File:</strong> {uploadResult.fileName}
                <br />
                <strong>Size:</strong>{" "}
                {uploadResult.fileSize
                  ? formatFileSize(uploadResult.fileSize)
                  : "Unknown"}
                <br />
                <strong>Type:</strong> {uploadResult.fileType}
              </p>
            </div>
          ) : (
            <p>❌ {uploadResult.error}</p>
          )}
        </div>
      )}

      <form id="upload-form" action={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose File *
          </label>
          <input
            type="file"
            id="file"
            name="file"
            required
            accept="image/jpeg,image/png,image/gif,text/plain"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-sm text-gray-500 mt-1">
            Supported formats: JPEG, PNG, GIF, TXT (max 5MB)
          </p>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <title>Uploading</title>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload File"
          )}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Features demonstrated:</strong>
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>File upload with Server Actions</li>
          <li>File validation (type, size)</li>
          <li>Upload progress indication</li>
          <li>Error handling and user feedback</li>
          <li>Form reset after successful upload</li>
        </ul>
      </div>
    </div>
  );
}
