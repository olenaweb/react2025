import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  container?: HTMLElement;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, container }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      if (container) container.style.zIndex = "1000";
    } else {
      if (container) container.style.zIndex = "-1";
    }
  }, [isOpen, container]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
      if (container) container.style.zIndex = "-1";
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      className="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    container ?? document.body
  );
};

export default Modal;
