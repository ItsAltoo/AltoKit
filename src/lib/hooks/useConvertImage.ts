import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

export const useConvertImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<string>("png");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [downloadUrls, setDownloadUrls] = useState<
    Array<{ url: string; filename: string }>
  >([]);
  const [downloadedIndices, setDownloadedIndices] = useState<Set<number>>(
    new Set()
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      setDownloadUrls([]);
      setDownloadedIndices(new Set());
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setIsLoading(true);
    setDownloadUrls([]);
    setDownloadedIndices(new Set());

    try {
      const conversionPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("format", format);
        if (width > 0) formData.append("width", width.toString());
        if (height > 0) formData.append("height", height.toString());

        const response = await axios.post("/api/convert-image", formData, {
          responseType: "blob",
        });

        if (response.status !== 200)
          throw new Error(`Gagal mengonversi ${file.name}`);

        const blob = await response.data;
        const url = window.URL.createObjectURL(blob);

        // Extract filename without extension
        const originalName = file.name;
        const lastDotIndex = originalName.lastIndexOf(".");
        const nameWithoutExt =
          lastDotIndex > 0
            ? originalName.substring(0, lastDotIndex)
            : originalName;
        const newFilename = `${nameWithoutExt}.${format}`;

        return { url, filename: newFilename };
      });

      const results = await Promise.all(conversionPromises);
      setDownloadUrls(results);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat konversi.");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsDownloaded = (index: number) => {
    setDownloadedIndices((prev) => new Set([...prev, index]));
  };

  return {
    files,
    format,
    width,
    height,
    isLoading,
    downloadUrls,
    downloadedIndices,
    handleFileChange,
    setFormat,
    setWidth,
    setHeight,
    handleSubmit,
    markAsDownloaded,
  };
};
