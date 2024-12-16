import { Popular, Trending } from "@/components";

function Home() {
  return (
    <div className="h-screen flex flex-col gap-6">
      <Trending />
      <Popular />
    </div>
  );
}

export default Home;
