import BlurIn from "@/components/ui/blur-in";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-4 py-16 gap-8">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://aniwatchtv.to/images/anw-min.webp"
          alt="Anime Illustration"
          className="max-h-[450px] object-contain rounded-xl shadow-lg"
        />
      </div>
      <div className="h-full flex flex-col justify-evenly space-y-6 max-w-xl">
        <BlurIn
          word="Discover, Stream, and Immerse Yourself in the Best Anime from Around the World"
          className="text-gray-200 font-normal text-3xl md:text-4xl leading-normal "
        />
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="default"
            size="lg"
            className="w-full md:w-auto bg-indigo-700 hover:bg-indigo-800 text-white rounded-full"
            onClick={() => navigate("/home")}
          >
            Get Started
          </Button>
          
        </div>
      </div>
    </div>
  );
}

export default Landing;
