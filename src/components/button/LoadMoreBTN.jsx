import './loadMore.css'
import PropTypes from 'prop-types';


export const LoadMoreBTN= ({ children, onClick }) => {
    return (
      <button type="button" className='Btn' onClick={onClick} aria-label="Load more">
        {children}
      </button>
    );
  };
  
  LoadMoreBTN.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
  };
