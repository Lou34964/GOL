import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { ButtonToolbar, MenuItem, DropdownButton, Checkbox } from 'react-bootstrap';
import Box from './Box'

class Grid extends React.Component {
	render() {
		const width = (this.props.cols * 14);
		var rowsArr = [];

		var boxClass = "";
		for (var i = 0; i < this.props.rows; i++) {
			for (var j = 0; j < this.props.cols; j++) {
				let boxId = i + "_" + j;
				let randomcolor = Math.floor(Math.random()*16777215).toString(16)
				let colstyletxt = `background-color: #${randomcolor}`;
				if(!this.props.colors){
					randomcolor='FF0000'
				}
				boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
				rowsArr.push(
					<Box
						boxClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						col={j}
						selectBox={this.props.selectBox}
						style={{backgroundColor: '#' + randomcolor}}
						colors={this.props.colors}
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
}

export default Grid;