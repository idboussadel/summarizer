import "../App.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col mt-10">
      <h1 className="head_text">
        Studying has never
        <br /> been easier with <br className="max-md:hidden" />
        <span className="orange_gradient">Summize</span>
      </h1>
      <h2 className="desc">
        Say goodbye to information overload and elevate your learning experience
        with Summize, a revolutionary AI-powered tool designed to simplify your
        academic journey. Summarize articles from URLs, PDFs, word even power
        points.
      </h2>
      <div className="mt-7 space-x-4">
        <Link to="/summarize-url" className="black_btn">
          Summarize URL Article
        </Link>
        <Link to="/summarize-pdf" className="btn bg-red-500">
          Summarize PDF
        </Link>
        <Link to="/summarize-pptx" className="btn bg-orange-500">
          Summarize PowerPoint
        </Link>
        <Link to="/summarize-word" className="btn bg-blue-500">
          Summarize Word
        </Link>
      </div>
      <p className="desc pt-8">
        if the summrizer doesnt work its because the key api is expired!
      </p>
    </header>
  );
};

export default Hero;
