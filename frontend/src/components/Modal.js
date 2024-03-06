function Modal({isOpen, onClose, children}) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modalContent">
        <div className="closeButtonContainer">
          <button onClick={onClose}>X</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
