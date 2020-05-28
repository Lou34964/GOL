import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { ButtonToolbar, MenuItem, DropdownButton, Checkbox } from 'react-bootstrap';
import Box from './Box'


const Grid = (props) =>{
  const width = (props.cols * 14);
  var rowsArr = [];

  var boxClass = "";
  for (var i = 0; i < props.rows; i++) {
    for (var j = 0; j < props.cols; j++) {
      let boxId = i + "_" + j;
      let randomcolor = Math.floor(Math.random()*16777215).toString(16)
      let colstyletxt = `background-color: #${randomcolor}`;
      if(!props.colors){
        randomcolor='FF0000'
      }
      boxClass = props.gridFull[i][j] ? "box on" : "box off";
      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectBox={props.selectBox}
          style={{backgroundColor: '#' + randomcolor}}
          colors={props.colors}
        />
      );
    }
  }

  return (
    <div className="grid" style={{width: width}}>
      {rowsArr}
    </div>
  );
}

export default Grid;