import { useEffect } from "react";

export default function Modal({ title, eyebrow, children, onClose }) {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-user-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div className="section-heading">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="create-user-title">{title}</h2>
          </div>

          <button
            className="modal-close"
            type="button"
            aria-label="Close modal"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {children}
      </section>
    </div>
  );
}
