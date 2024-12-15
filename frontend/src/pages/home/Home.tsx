import { Popular, Trending } from "@/components";
import React from "react";

function Home() {
  return (
    <div className=" flex flex-col gap-6">
      <Trending />
      <Popular />
    </div>
  );
}

export default Home;
