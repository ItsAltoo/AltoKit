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
import { useState } from "react";

export default function HomeView() {
  const [search, setSearch] = useState("");

  const filteredData = homeData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-4">
      <div className="col-span-3 flex gap-2">
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
      {filteredData.map((item, i) => (
        <Item
          variant={"outline"}
          className="flex gap-4 h-24 items-center justify-center "
          key={i}
          asChild
        >
          <Link href={item.link}>
            <ItemMedia variant={"icon"} className="md:p-7 sm:p-5 ">
              {item.icon}
            </ItemMedia>

            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
          </Link>
        </Item>
      ))}
    </div>
  );
}
