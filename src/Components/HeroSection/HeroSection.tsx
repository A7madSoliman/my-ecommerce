import HeroImg from "../../assets/Frame_1707481586.png";

function HeroSection() {
  return (
    <div className="relative">
      {/* Gradient background */}
      <div
        className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr
        from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10 opacity-50"
      ></div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Left side */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="flex items-center gap-2 bg-gray-50 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-colors group cursor-pointer">
            <span className="group-hover:scale-110 transition-transform">
              ⭐
            </span>
            <span className="text-sm font-medium">
              Jump start your shopping
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            We Boost the growth for{" "}
            <span className="text-blue-600 relative inline-block">
              start up to fortune 500
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200/60"></span>
            </span>{" "}
            companies
            <span className="inline-block ml-2 animate-pulse">⏰</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            accusantium placeat consequatur.
          </p>
          <form
            className="flex max-w-md gap-4"
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
          >
            <input
              className="flex-1 px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none
              focus:ring-2 focus:ring-blue-500 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              type="email"
              placeholder="Email Address"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700
              cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-300"
            >
              ➜
            </button>
          </form>
        </div>
        {/* Right side */}
        <div className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-16">
          <div className="relative">
            <img
              className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"
              src={HeroImg}
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
