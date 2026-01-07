import { Gif, Filter } from "@mui/icons-material";

interface HomeDataItem {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

export const homeData: HomeDataItem[] = [
  {
    title: "Image Converter",
    description: "Convert images between different formats.",
    link: "/convert-image",
    icon: <Filter />,
  },
  {
    title: "Video To GIF Converter",
    description: "Convert videos to animated GIFs easily.",
    link: "/convert-video",
    icon: <Gif />,
  },
];
