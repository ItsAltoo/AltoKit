"use client";
import {
  Loader2,
  Upload,
  Download,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConvertImage } from "@/lib/hooks/useConvertImage";
import Link from "next/link";

export default function ImageConverter() {
  const {
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
  } = useConvertImage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Image Converter</CardTitle>
              </div>
              <CardDescription>
                Changes the format of your images quickly and easily.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="picture">Upload Images</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="cursor-pointer file:text-primary"
                    />
                  </div>
                  {files.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {files.length} file(s) selected
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Target Format</Label>
                  <Select
                    defaultValue={format}
                    onValueChange={(value) => setFormat(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="avif">AVIF</SelectItem>
                      <SelectItem value="gif">GIF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Resize (Optional)</Label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="width" className="text-sm">
                          Width
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          max={3840}
                          value={width}
                          onChange={(e) => setWidth(Number(e.target.value))}
                          className="w-24 h-8 text-sm"
                          placeholder="Auto"
                        />
                      </div>
                      <Slider
                        id="width"
                        min={0}
                        max={3840}
                        step={10}
                        value={[width]}
                        onValueChange={(value) => setWidth(value[0])}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="height" className="text-sm">
                          Height
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          max={2160}
                          value={height}
                          onChange={(e) => setHeight(Number(e.target.value))}
                          className="w-24 h-8 text-sm"
                          placeholder="Auto"
                        />
                      </div>
                      <Slider
                        id="height"
                        min={0}
                        max={2160}
                        step={10}
                        value={[height]}
                        onValueChange={(value) => setHeight(value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Set to 0 for auto. Aspect ratio is maintained.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={files.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Convert Now
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </div>

          {downloadUrls.length > 0 && (
            <div className="flex-1 flex items-center justify-center p-6  rounded-lg border-l md:border-t-0 border-t ">
              <div className="space-y-4 w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-sm font-medium ">
                    {downloadUrls.length} Convert Successfully
                  </span>
                </div>
                <ScrollArea className="h-72 w-full rounded-md">
                  <div className="space-y-2 pr-4">
                    {downloadUrls.map((item, index) => {
                      const isDownloaded = downloadedIndices.has(index);
                      return (
                        <Button
                          key={index}
                          asChild
                          variant="outline"
                          className="w-full justify-start whitespace-normal text-left h-auto py-2"
                        >
                          <Link
                            href={item.url}
                            download={item.filename}
                            onClick={() => markAsDownloaded(index)}
                          >
                            {isDownloaded ? (
                              <Check className="mr-2 h-4 w-4 shrink-0 text-green-600" />
                            ) : (
                              <Download className="mr-2 h-4 w-4 shrink-0" />
                            )}
                            <span className="wrap-break-word">
                              {item.filename}
                            </span>
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
