const SectionTitle = ({ subtitle, title }) => {
  return (
    <div className="text-center font-inter pb-16 lg:pb-24">
      <p className="lg:text-xl italic text-brown3 pb-8 lg:pb-12">{subtitle}</p>
      <h1>
        <span className="text-2xl md:text-3xl lg:text-4xl text-dark1 border-y-[3px] lg:border-y-4 border-dark6 px-8 lg:px-16 py-4">
          {title}
        </span>
      </h1>
    </div>
  );
};

export default SectionTitle;
