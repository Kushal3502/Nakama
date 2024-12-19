import BlurIn from "@/components/ui/blur-in";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { useState } from "react";

function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly w-full px-4 py-16 gap-8 mx-auto">
      <img
        src="https://aniwatchtv.to/images/anw-min.webp"
        alt="Anime Illustration"
        className="max-h-[450px] object-contain rounded-xl transition-all duration-300 hover:scale-105"
      />
      <div className="h-full flex flex-col justify-evenly space-y-8 max-w-xl">
        <BlurIn
          word="Join Your Nakama in the Ultimate Anime Adventure"
          className="text-gray-200 font-bold text-3xl md:text-4xl leading-normal bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
        />
        <p className="text-gray-300 text-lg">
          Discover thousands of anime series, connect with fellow fans, and
          embark on an unforgettable journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            placeholder="Search your favourite anime"
            onChange={(e) => setQuery(e.target.value)}
            className="bg-gray-800/50 border-indigo-500/30 focus:border-indigo-400 rounded-full w-full"
          />
          <Button
            variant="default"
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
            onClick={() => navigate(`/search?query=${query}`)}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
