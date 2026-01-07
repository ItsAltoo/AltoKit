"use client";

import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useState } from "react";
import { Scissors, Upload, Download, Check, ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ImagePreviewDialog from "@/components/ImagePreviewDialog";
import { formatFileSize, fetchFileSize } from "@/lib/formatFileSize";

export default function RemoveBgView() {
  const [publicId, setPublicId] = useState<string>("");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    title: string;
    removeBackground: boolean;
  }>({ title: "", removeBackground: false });
  const [fileSize, setFileSize] = useState<string>("");

  const handleImageClick = (title: string, removeBackground = false) => {
    setSelectedImage({ title, removeBackground });
    setDialogOpen(true);
  };

  const handleFileSize = async (url: string) => {
    const size = await fetchFileSize(url);
    if (size) {
      setFileSize(formatFileSize(size));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Scissors className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Background Remover</CardTitle>
              </div>
              <CardDescription>
                Remove background from your images automatically using AI.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <CldUploadWidget
                    uploadPreset="altokit"
                    options={{
                      sources: ["local", "url"],
                      resourceType: "image",
                      maxFileSize: 10000000,
                    }}
                    onSuccess={(result: CloudinaryUploadWidgetResults) => {
                      if (
                        typeof result.info === "object" &&
                        result.info?.public_id
                      ) {
                        console.log("Upload Berhasil:", result.info);
                        setPublicId(result.info.public_id);
                        setIsDownloaded(false);
                        // Fetch PNG file size
                        const pngUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_background_removal/${result.info.public_id}.png`;
                        handleFileSize(pngUrl);
                      }
                    }}
                  >
                    {({ open }) => (
                      <Button
                        type="button"
                        onClick={() => open()}
                        className="w-full"
                        variant="default"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Select Image
                      </Button>
                    )}
                  </CldUploadWidget>
                  {publicId && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Image successfully uploaded!
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Maximum file size: 10MB</p>
                  <p>• Supported formats: JPG, PNG, WebP</p>
                  <p>• Output format: PNG with transparency</p>
                  <p>• AI-powered background removal</p>
                </div>
              </div>
            </CardContent>
          </div>

          {publicId && (
            <div className="flex-1 flex items-center justify-center p-6 rounded-lg border-l md:border-t-0 border-t">
              <div className="space-y-4 w-full max-w-sm">
                <div className="flex flex-col items-center justify-center mb-4 space-y-1">
                  <div className="p-3 bg-primary/10 rounded-lg mb-2">
                    <ImageIcon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-sm font-medium">
                    Background Removed
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Your image is ready to download
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-center">Original</p>
                    <div
                      className="border rounded-lg overflow-hidden bg-muted/20 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleImageClick("Original")}
                    >
                      <CldImage
                        width="200"
                        height="200"
                        src={publicId}
                        alt="Original"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-center">
                      No Background
                    </p>
                    <div
                      className="border rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition:
                          "0 0, 0 10px, 10px -10px, -10px 0px",
                      }}
                      onClick={() =>
                        handleImageClick("Background Removed", true)
                      }
                    >
                      <CldImage
                        width="200"
                        height="200"
                        src={publicId}
                        removeBackground
                        alt="Removed BG"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full"
                  onClick={() => setIsDownloaded(true)}
                >
                  <Link
                    href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/fl_attachment/e_background_removal/${publicId}.png`}
                    download={`${publicId}-no-bg.png`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="mr-2 h-4 w-4 text-green-600" />
                        Downloaded
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download PNG {fileSize && `(${fileSize})`}
                      </>
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Image Preview Dialog */}
      <ImagePreviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        publicId={publicId}
        title={selectedImage.title}
        removeBackground={selectedImage.removeBackground}
      />
    </div>
  );
}
