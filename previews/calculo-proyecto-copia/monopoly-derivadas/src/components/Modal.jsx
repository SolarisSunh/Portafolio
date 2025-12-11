import PropTypes from "prop-types";

export default function Modal({ open, title, children, onClose, showDefaultButton = true, footer = null }) {
  return (
    <div
      className={[
        "fixed inset-0 z-50", 
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={[
          "absolute inset-0 bg-black/50 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />
      {/* Card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={[
            "w-full max-w-md rounded-2xl shadow-2xl border border-neutral-200",
            "bg-amber-50 text-neutral-900",
            "transition-all duration-200",
            open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-1",
          ].join(" ")}
        >
          <div className="px-5 py-4 border-b border-amber-200">
            <h3 className="text-lg font-semibold text-emerald-900">{title}</h3>
          </div>
          <div className="px-5 py-4">
            {children}
          </div>
          {footer ? (
            <div className="px-5 pb-5">{footer}</div>
          ) : showDefaultButton ? (
            <div className="px-5 pb-5">
              <button
                onClick={onClose}
                className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-700 text-white font-semibold py-3 text-base shadow hover:bg-emerald-800 transition-colors"
                type="button"
              >
                Continuar
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  showDefaultButton: PropTypes.bool,
  footer: PropTypes.node,
};


