import { CldImage } from "next-cloudinary";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImagePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publicId: string | null;
  title: string;
  removeBackground?: boolean;
  isVideoToGif?: boolean;
}

export default function ImagePreviewDialog({
  open,
  onOpenChange,
  publicId,
  title,
  removeBackground = false,
  isVideoToGif = false,
}: ImagePreviewDialogProps) {
  if (!publicId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          className="flex items-center justify-center p-4"
          style={
            removeBackground
              ? {
                  backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                }
              : undefined
          }
        >
          {isVideoToGif ? (
            <img
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/f_gif,fl_lossy/${publicId}.gif`}
              alt={title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          ) : (
            <CldImage
              width="800"
              height="800"
              src={publicId}
              alt={title}
              removeBackground={removeBackground}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
