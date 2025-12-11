import PropTypes from "prop-types";

function Die({ value, rolling }) {
  return (
    <div
      className={[
        "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white text-neutral-900",
        "flex items-center justify-center font-bold text-lg sm:text-xl",
        "shadow border border-neutral-200",
        rolling ? "animate-bounce" : "",
      ].join(" ")}
    >
      {value > 0 ? value : "-"}
    </div>
  );
}

Die.propTypes = {
  value: PropTypes.number.isRequired,
  rolling: PropTypes.bool,
};

export default function Dice({ values = [0, 0], rolling = false }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Die value={values[0] || 0} rolling={rolling} />
      <Die value={values[1] || 0} rolling={rolling} />
    </div>
  );
}

Dice.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number),
  rolling: PropTypes.bool,
};





