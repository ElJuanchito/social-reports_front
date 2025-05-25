import React from "react";

interface ValidationDTO {
  field: string;
  message: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode | ValidationDTO | ValidationDTO[] | string;
  type?: "error" | "success" | "info";
}

const renderChildren = (children: ModalProps["children"]) => {
  if (typeof children === "string" || React.isValidElement(children)) {
    return children;
  }
  if (Array.isArray(children)) {
    // Array de ValidationDTO
    return (
      <ul className="list-disc pl-5">
        {children.map((item, idx) =>
          typeof item === "object" && "message" in item ? (
            <li key={idx}>
              <strong>{item.field}:</strong> {item.message}
            </li>
          ) : (
            <li key={idx}>{String(item)}</li>
          )
        )}
      </ul>
    );
  }
  if (typeof children === "object" && children && "message" in children) {
    // Un solo ValidationDTO
    return (
      <div>
        <strong>{(children as ValidationDTO).field}:</strong> {(children as ValidationDTO).message}
      </div>
    );
  }
  return String(children);
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children, type = "info" }) => {
  if (!open) return null;
  let color = "";
  if (type === "error") color = "border-red-500";
  if (type === "success") color = "border-green-500";
  if (type === "info") color = "border-blue-500";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`bg-white rounded-xl shadow-lg p-6 min-w-[300px] border-2 ${color} relative`}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        {renderChildren(children)}
      </div>
    </div>
  );
};

export default Modal;
