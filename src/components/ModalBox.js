
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalBox extends Component {
 
  render() {
    const { handleClose, show, children } = this.props;

    const toggleShow = show ? "modal display-block" : "modal display-none";

    return (
       <div className={toggleShow}>   
        <div className="modal-main" ref={node=>(this.modal=node)}>
          {children}
          <button onClick={handleClose}> </button>
        </div>
      </div>
    );
  };
}

ModalBox.propTypes = {
  handleClose: PropTypes.func,
  show:PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
};

export default ModalBox;

