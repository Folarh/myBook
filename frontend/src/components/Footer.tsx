const Footer = () => {
  return (
    <main className="bg-gray-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          MATRIXTEL
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy policy</p>
          <p className="cursor-pointer">Terms of service</p>
        </span>
      </div>
    </main>
  );
};

export default Footer;
