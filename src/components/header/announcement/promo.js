import React from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

export default function Promo({ showPromo, setShowPromo, promoData }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      height: '55vh',
      width: '25vw',
      transform: "translate(-50%, -50%)",
      overflow: 'hidden',
      padding: 0
    },
  };
  return (
    <Modal isOpen={showPromo} style={customStyles} contentLabel="Example Modal">
      <img src={promoData[0]?.web_url} style={{height: '100%', width: '100%', objectFit: 'cover'}} />
      <div className="close-circle">
      <AiOutlineClose
        color="#0B819D"
        onClick={() => setShowPromo(false)}
        size={16}
      />
      </div>
      
    </Modal>
  );
}
