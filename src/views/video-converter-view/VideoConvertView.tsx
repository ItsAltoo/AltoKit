"use client";

import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useState } from "react";
import { Film, Upload, Download, Check, ImageIcon } from "lucide-react";
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

export default function VideoConvertView() {
  const [publicId, setPublicId] = useState<string>("");
  const [isDownloaded, setIsDownloaded] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Film className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Video to GIF Converter</CardTitle>
              </div>
              <CardDescription>
                Convert your videos to animated GIFs quickly and easily.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Upload Video</Label>
                  <CldUploadWidget
                    uploadPreset="altokit"
                    options={{
                      sources: ["local", "url"],
                      resourceType: "video",
                      maxFileSize: 5000000,
                    }}
                    onSuccess={(result: CloudinaryUploadWidgetResults) => {
                      if (
                        typeof result.info === "object" &&
                        result.info?.public_id
                      ) {
                        console.log("Upload Berhasil:", result.info);
                        setPublicId(result.info.public_id);
                        setIsDownloaded(false);
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
                        Select Video
                      </Button>
                    )}
                  </CldUploadWidget>
                  {publicId && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Video successfully uploaded!
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Maximum file size: 5MB</p>
                  <p>• Supported formats: MP4, MOV, AVI, and more</p>
                  <p>• Output format: Animated GIF</p>
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
                    GIF Conversion Result
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Your video has been converted
                  </span>
                </div>

                <div className="border rounded-lg overflow-hidden bg-muted/20">
                  <img
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/f_gif,q_auto/${publicId}.gif`}
                    alt="Video converted to gif"
                    className="w-full h-auto"
                  />
                </div>

                <Button
                  asChild
                  className="w-full"
                  onClick={() => setIsDownloaded(true)}
                >
                  <Link
                    href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/fl_attachment/f_gif/${publicId}.gif`}
                    download={`${publicId}.gif`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="mr-2 h-4 w-4 text-green-600" />
                        Downloaded
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download GIF
                      </>
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
