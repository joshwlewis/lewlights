import type { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <>
      <div className="text-gray-200 text-center">
        <h2 className="text-xl mb-2">
          Our lights are <b>off</b>.
        </h2>
        <h2 className="text-lg">
          The lights will glow again in November 2022.
          We hope to see you then.
        </h2>
      </div>
      <div className="flex justify-center items-center my-8">
        <div className="w-3/4 md:w-2/3 lg:w-1/2">
          <video autoPlay loop muted className=''>
            <source
              src='lewlights-hero.mp4'
              type='video/mp4'
            />
          </video>
        </div>
      </div>
      <div className="text-gray-200 text-center my-6">
        <h4 className="text-xl mb-2">
          Have a great year!
        </h4>
      </div>
    </>
    );
};

export default Index;
