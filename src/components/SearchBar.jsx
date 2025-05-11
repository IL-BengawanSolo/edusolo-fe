import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "react-iconly";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto mt-10">
      <div className="relative">
        <Search
          className="absolute top-1/2 left-10 -translate-y-1/2 text-neutral-grey"
        />
        <Input
          type="text"
          placeholder="Cari destinasi wisata..."
          className="pl-24 rounded-lg h-16 pr-20 bg-white placeholder:text-neutral-grey border-none placeholder:font-medium placeholder:text-lg placeholder:italic text-neutral-dark-grey !font-medium !text-lg"
        />
      </div>
      <Button
        size="custom"
        variant="lite"
        type="submit"
        className="absolute top-1/2 right-2 -translate-y-1/2 h-12 px-4 min-h-12"
      >
        Cari
      </Button>
    </div>
  );
};

export default SearchBar;
