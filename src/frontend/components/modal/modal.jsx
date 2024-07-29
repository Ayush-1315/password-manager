import modalCSS from "./modal.module.css"

export const Modal = ({ component, onClose }) => {
  return <div className={modalCSS.container} onClick={onClose}>
    <div className={modalCSS.componentContainer} onClick={e=>e.stopPropagation()}>
    {component}
    </div>
  </div>;
};
