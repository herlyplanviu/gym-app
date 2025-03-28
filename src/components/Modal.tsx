import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  disableFooter = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  disableFooter?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className='bg-black/75 p-5 overflow-auto text-center fixed top-0 right-0 left-0 bottom-0 z-1 w-full h-full before:content-[""] before:inline-block before:h-full before:align-middle'>
      <div className="relative inline-block p-4 w-full max-w-xl h-full md:h-auto align-middle">
        <div className="bg-white rounded-lg shadow-lg w-xl">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              &times;
            </button>
          </div>
          <div className="p-4">{children}</div>
          {!disableFooter && (
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <Button onClick={onClose} variant="error">
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
