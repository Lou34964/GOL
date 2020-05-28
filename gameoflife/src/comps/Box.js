import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { ButtonToolbar, MenuItem, DropdownButton, Checkbox } from 'react-bootstrap';

class Box extends React.Component {
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col);
	}

	render() {
		if(this.props.boxClass == 'box on'){
		return (
			<div
				className={this.props.boxClass}
				id={this.props.id}
				onClick={this.selectBox}
				style={this.props.style}
			/>
		);
		}
		else{
			return (
				<div
					className={this.props.boxClass}
					id={this.props.id}
					onClick={this.selectBox}
				/>
			);
		}

	}
}

export default Box;