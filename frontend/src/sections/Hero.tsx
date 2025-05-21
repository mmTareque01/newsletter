import {  FaUser } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="relative z-10 flex min-h-screen h-full items-center justify-center bg px-4 sm:px-8">
      {/* <BackgroundGrid /> */}

      <div className="relative z-10 max-w-3xl text-white space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Dive into new markets and ideas <br />
          with <span className="text-orange-500">65,289</span> like-minded
          founders.
        </h1>
        <p className="text-lg sm:text-xl">
          Save 2,000+ hours of market research with{" "}
          <strong>free 5-minute reports</strong> on AI, Crypto, and more.
        </p>

        <div className="flex flex-col sm:flex-row  gap-4 mt-6">
          <input
            type="email"
            placeholder="you@example.com"
            className="rounded-lg border border-orange-500 bg-black/50 px-5 py-3 w-[400px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition">
            Get Started →
          </button>
        </div>

        <div className="flex items-center  gap-2 mt-4">
          {/* Avatars */}
          {Array.from({ length: 8 }).map((_, i) =>
            // <img
            //   key={i}
            //   src={`/avatars/avatar-${(i % 10) + 1}.jpg`}
            //   alt={`Avatar ${i + 1}`}
            //   className="w-8 h-8 rounded-full border border-white object-cover"
            //   loading="lazy"
            // />

            false ? (
              <img
                key={i}
                src={`/avatars/avatar-${(i % 10) + 1}.jpg`}
                alt={`Avatar ${i + 1}`}
                className="w-8 h-8 rounded-full border border-white object-cover"
                loading="lazy"
              />
            ) : (
              <div key={i} className="w-8 h-8 rounded-full  flex items-center justify-center border border-white">
                {/* < className="w-4 h-4 text-gray-500" /> */}
                <FaUser />
              </div>
            )
          )}

          <p className="text-sm text-gray-300">
            Join 65,289 founders discovering new markets
          </p>
        </div>
      </div>
    </div>
  );
}
