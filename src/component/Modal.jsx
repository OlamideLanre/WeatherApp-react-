import React, { useEffect } from "react";

const Modal = ({ modal, onClose }) => {
  useEffect(() => {
    if (modal.isError) {
      document.getElementById("my_modal_5").showModal();
    }
  }, [modal.isError]);
  const close = () => {
    onClose();
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-green-400">{modal.header}</h3>
          <p className="py-4">{modal.msg}</p>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={close} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
