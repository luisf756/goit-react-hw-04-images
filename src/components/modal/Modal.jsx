// import  { Component } from 'react';
import PropTypes from 'prop-types';
// import { createPortal } from 'react-dom';
import  './modal.css';
import { useEffect } from 'react';


export const Modal  = ({children,isOpen, onClose})=>{
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  
  const handelModalClic=(e)=> e.stopPropagation();
  return (
    
    <article className={`modal ${isOpen && "is-open"}`} onClick={onClose}>
      <div className='modal-container' onClick={handelModalClic}>
        <button class='modal-close' onClick={onClose} >X</button>
        
        {children}
      </div>
    </article>
  )
}


Modal.propTypes = {
  children: PropTypes.node,
  //  onClose: PropTypes.func.isRequired,
};