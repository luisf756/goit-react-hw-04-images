// import React, { Component } from 'react'
import styles from './displayImage.css';
import { Modal } from '../../modal/Modal';
import { useModal } from 'components/hooks/useModal';


export const DisplayImage =({url,alt,largeImage})=> {
  
    const [isOpen,opeModal,closeModal]=useModal(false);

    return (
      <>
        <div className={styles['item']} onClick={opeModal}>
          <img className={styles['card']} src={url} alt={alt} loading="lazy" />
        </div>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={closeModal}> 
            <img alt={alt} src={largeImage} />
          </Modal>
          
        )}
      </>
    );  
}

