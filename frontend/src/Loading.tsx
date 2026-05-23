const Loading = () => {
  return (
    <section className="flex w-full h-screen flex-col gap-4 justify-center items-center">
      <img
        src="./hireflow_favicon.png"
        alt="Hireflow icon"
        className="w-20 h-20 object-fit-contain"
      />
      <section className="flex space-x-2 justify-center items-center bg-white dark:invert">
        <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-black rounded-full animate-bounce"></div>
      </section>
    </section>
  );
};

export default Loading;
