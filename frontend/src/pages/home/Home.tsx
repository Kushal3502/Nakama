import { Popular, Recent, Trending } from "@/components";

function Home() {
  return (
    <div className="h-screen flex flex-col gap-6 md:mx-20">
      <Trending />
      <Popular />
      <Recent />
    </div>
  );
}

export default Home;
