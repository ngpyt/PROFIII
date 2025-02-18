const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[100px]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-fuchsia-500/20 blur-[100px] animate-blob1" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[100px] animate-blob2" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[100px] animate-blob3" />
    </div>
  );
};

export default BackgroundAnimation;
