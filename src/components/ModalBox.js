
import React, { Component } from 'react';
import isNil from 'lodash/fp/isNil';
import PropTypes from 'prop-types';

class ModalBox extends Component {

  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount(){    
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }  
  
  handleOutsideClick(e) {
    const { handleClose } = this.props;
    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        handleClose();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }

  handleKeyUp(e) {
    const { handleClose } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        handleClose();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };
    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }


  render() {
    const { handleClose, show, children } = this.props;

    const toggleShow = show ? "modal display-block" : "modal display-none";

    return (
      <div className={toggleShow}>
        <div className="modal-main" ref={node => (this.modal = node)}>
          {children}
          <button onClick={handleClose}> </button>
        </div>
      </div>
    );
  };
}

ModalBox.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
};

export default ModalBox;

