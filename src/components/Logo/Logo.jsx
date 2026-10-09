const base = import.meta.env.BASE_URL;
const logo100 = `${base}logo-100.webp`;
const logo200 = `${base}logo-200.webp`;

const Logo = ({ priority = false }) => {
  return (
    <img
      src={logo200}
      srcSet={`${logo100} 100w, ${logo200} 200w`}
      sizes="(max-width: 768px) 100px, 200px"
      alt="JobList.am logo"
      className="logo"
      width="100"
      height="100"
      fetchpriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
};

export default Logo;