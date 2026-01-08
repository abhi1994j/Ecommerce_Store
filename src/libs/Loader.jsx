
const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center gap-2">
      <p className="size-5 animate-spin rounded-full border-y-black border-y-2"></p><span className="italic">Loading...</span>
    </div>
  );
};

export { Loader };
