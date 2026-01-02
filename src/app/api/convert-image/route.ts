import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const format = formData.get("format") as string;
    const width = formData.get("width") as string | null;
    const height = formData.get("height") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!format || !["png", "jpeg", "webp", "avif", "gif"].includes(format)) {
      return NextResponse.json({ error: "Invalid format" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let sharpInstance = sharp(buffer, { animated: format === "gif" });

    // Apply resize if width or height is provided
    if (width || height) {
      const resizeOptions: { width?: number; height?: number } = {};
      if (width) resizeOptions.width = parseInt(width, 10);
      if (height) resizeOptions.height = parseInt(height, 10);
      sharpInstance = sharpInstance.resize(resizeOptions);
    }

    const convertedBuffer = await sharpInstance
      .toFormat(format as keyof sharp.FormatEnum)
      .toBuffer();

    // Extract filename without extension
    const originalName = file.name;
    const lastDotIndex = originalName.lastIndexOf(".");
    const nameWithoutExt =
      lastDotIndex > 0 ? originalName.substring(0, lastDotIndex) : originalName;
    const newFilename = `${nameWithoutExt}.${format}`;

    return new NextResponse(convertedBuffer as unknown as ArrayBuffer, {
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(
          newFilename
        )}`,
      },
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
