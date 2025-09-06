import { X } from "lucide-react";

const ModalHeader = ({ title, onClose }) => {
  return (
    <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b">
      <h3 className="text-lg font-semibold">{title}</h3>
      <button
        onClick={onClose}
        className="p-2 rounded text-gray-600 hover:bg-gray-100"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ModalHeader;
