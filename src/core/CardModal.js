import React from 'react'
import ReactDOM from 'react-dom';

const el = document.getElementById('modal1'); 
function CardModal(props) {
    return ReactDOM.createPortal(
        props.children,
        el
    );
}

export default CardModal
