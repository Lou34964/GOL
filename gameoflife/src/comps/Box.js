import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { ButtonToolbar, MenuItem, DropdownButton, Checkbox } from 'react-bootstrap';

const Box = (props) =>{
  const selectBox = () => {
    props.selectBox(props.row, props.col);
  }

  if(props.boxClass == 'box on'){
    return (
			<div
				className={props.boxClass}
				id={props.id}
				onClick={selectBox}
				style={props.style}
			/>
		);
  }
  else{
    return (
      <div
        className={props.boxClass}
        id={props.id}
        onClick={selectBox}
      />
    );
  }
}

export default Box;