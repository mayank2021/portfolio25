import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui";
import AnimatedCircles from "../CircleAnimation/CircleAnimation";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  size?: "small" | "medium" | "large";
  showCloseButton?: boolean;
}

interface ModalTriggerProps {
  buttonText: string;
  buttonVariant?:
    | "fill-white"
    | "fill-black"
    | "stroked-white"
    | "stroked-black"
    | "translucent-white"
    | "translucent-black"
    | "ghost-white"
    | "ghost-black";
  buttonSize?: "small" | "large" | "medium";
  modalTitle?: string;
  modalSize?: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen = false,
  onClose,
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent background scroll - store original overflow value
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Also prevent scroll on html element for better browser support
      document.documentElement.style.overflow = "hidden";

      // Handle escape key
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && onClose) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        // Restore original overflow values
        document.body.style.overflow = originalOverflow || "";
        document.documentElement.style.overflow = "";
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      // Restore focus to the previously focused element when closing
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.8)] bg-opacity-50 backdrop-blur-sm overflow-hidden"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      style={{ touchAction: "none" }}
    >
      <div
        ref={modalRef}
        className={`relative rounded-lg shadow-xl transform transition-all duration-300 ease-in-out w-screen h-screen overflow-hidden`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {showCloseButton && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="text-white absolute top-5 right-5"
            >
              <AnimatedCircles text="X" textStyle="text-white font-bold" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal with Trigger Button Component
const ModalWithTrigger: React.FC<ModalTriggerProps> = ({
  buttonText,
  buttonVariant = "fill-black",
  buttonSize = "medium",
  modalTitle,
  modalSize = "medium",
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {buttonText}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={modalTitle}
        size={modalSize}
      >
        {children}
      </Modal>
    </>
  );
};

export default Modal;
export { ModalWithTrigger };
