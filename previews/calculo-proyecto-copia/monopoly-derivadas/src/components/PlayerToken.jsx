import PropTypes from "prop-types";

function HatToken() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
      fill="currentColor"
    >
      {/* Brim */}
      <ellipse cx="12" cy="18" rx="8.5" ry="2.5" />
      {/* Body */}
      <rect x="7" y="9" width="10" height="8" rx="2" />
      {/* Top ellipse */}
      <ellipse cx="12" cy="9" rx="5" ry="2" />
    </svg>
  );
}

export default function PlayerToken({ color = "text-amber-300", title = "Ficha" }) {
  return (
    <div className="flex items-end justify-center">
      <div
        className={`${color} drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]`}
        title={title}
      >
        <HatToken />
      </div>
    </div>
  );
}

PlayerToken.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
};


