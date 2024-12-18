import { Hero, Popular, Recent, Trending } from "@/components";

function Home() {
  return (
    <div className="h-screen flex flex-col gap-6">
      <Hero/>
      <Trending />
      <Popular />
      <Recent />
    </div>
  );
}

export default Home;
