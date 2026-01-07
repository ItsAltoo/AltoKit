"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { homeData } from "@/data/home";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function HomeView() {
  const [search, setSearch] = useState("");

  const filteredData = homeData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const backgroundColors = [
    "bg-red-100 dark:bg-red-950",
    "bg-blue-100 dark:bg-blue-950",
    "bg-green-100 dark:bg-green-950",
    "bg-yellow-100 dark:bg-yellow-950",
    "bg-purple-100 dark:bg-purple-950",
    "bg-pink-100 dark:bg-pink-950",
    "bg-indigo-100 dark:bg-indigo-950",
    "bg-orange-100 dark:bg-orange-950",
    "bg-teal-100 dark:bg-teal-950",
    "bg-cyan-100 dark:bg-cyan-950",
  ];

  const colorAssignments = useMemo(() => {
    return homeData.map(
      () =>
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );
  }, []);

  return (
    <>
      <div className="col-span-3 flex gap-2 mb-5">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant={"outline"}>
          <Search />
        </Button>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {filteredData.map((item, i) => {
          const originalIndex = homeData.findIndex(
            (d) => d.title === item.title
          );
          return (
            <Item
              variant={"outline"}
              className="flex gap-4 h-24 items-center justify-center "
              key={i}
              asChild
            >
              <Link href={item.link}>
                <ItemMedia
                  variant={"icon"}
                  className={`md:p-7 sm:p-5 ${colorAssignments[originalIndex]}`}
                >
                  {item.icon}
                </ItemMedia>

                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </ItemContent>
              </Link>
            </Item>
          );
        })}
      </div>
    </>
  );
}
