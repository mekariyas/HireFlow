const Error = ({ error }: { error: string }) => {
  return (
    <section className="w-full h-screen flex  flex-col justify-center items-center gap-4">
      <h1 className="text-lg lg:text-2xl font-extrabold">Error Occurred</h1>
      <p className="text-lg">{error}</p>
    </section>
  );
};

export default Error;
