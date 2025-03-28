import React from "react";
import Modal from "../Modal";
import QRCode from "react-qr-code";

function ModalBarcodeMember({
  open,
  data,
  onClose,
}: {
  open: boolean;
  data: null | string;
  onClose: () => void;
}) {
  return (
    <Modal title="Barcode Member" isOpen={open} onClose={onClose}>
      <div className="flex flex-col items-center">
        <QRCode value={data || ""} size={200} />
        <p className="mt-2 text-sm text-gray-500">{data}</p>
      </div>
    </Modal>
  );
}

export default ModalBarcodeMember;
