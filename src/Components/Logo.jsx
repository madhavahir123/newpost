/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/prop-types
function Logo({ width = "100px" }) {
  return (
    <div>
      <img
        src="/src/assets/logo.jpg"
        alt="logo"
        className=" rounded-lg h-10 w-10"
      />
    </div>
  );
}

export default Logo;
