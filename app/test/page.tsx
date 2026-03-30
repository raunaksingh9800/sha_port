
export default function page() {
  return (
    <>
      <div className="fixed w-screen  z-50 h-screen flex  flex-col justify-center items-center">
        <h1 className=" font-medium text-8xl transition-all  opacity-10 hover:opacity-20 backdrop-blur-2xl">
            Working on it
        </h1>
      </div>
      <div className="w-screen  h-screen animate-ping delay-500  p-4 grid grid-cols-[repeat(auto-fill,minmax(12px,1fr))] gap-4">
        {Array.from({ length: 900 }).map((_, i) => {
          const hue = Math.floor(Math.random() * 360);
          const opacity = Math.random() * 0.8 + 0.2;

          return (
            <div
              key={i}
              style={{
                animationDelay: `${i * 0.05}s`,
                // scale: `${i * 0.002} `,
              }}
              className="w-1 h-1 text-[10px] animate-pulse bg-white/40 transition-all hover:scale-150 rounded-full"
            /> 
          );
        })}
      </div>
    </>
  );
}
