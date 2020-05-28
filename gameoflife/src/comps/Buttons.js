import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { ButtonToolbar, MenuItem, DropdownButton, Checkbox } from 'react-bootstrap';

class Buttons extends React.Component {

	handleSelect = (evt) => {
		this.props.gridSize(evt);
	}

	render() {
		return (
			<div className="center">
				<ButtonToolbar>
					<button className="btn btn-default" onClick={this.props.step}>
						Step
					</button>
					<button className="btn btn-default" onClick={this.props.playButton}>
						Play
					</button>
					<button className="btn btn-default" onClick={this.props.pauseButton}>
					  Pause
					</button>
					<button className="btn btn-default" onClick={this.props.clear}>
					  Clear
					</button>
					<button className="btn btn-default btn-sp" onClick={this.props.slow}>
					  Slow
					</button>
					<button className="btn btn-default btn-sp" onClick={this.props.fast}>
					  Fast
					</button>
					<button className="btn btn-default btn-sp" onClick={this.props.hyper}>
					  Hyper
					</button>
					<button className="btn btn-default" onClick={this.props.seed}>
					  Seed
					</button>
					<DropdownButton
						title="Grid Size"
						id="size-menu"
						onSelect={this.handleSelect}
					>
						<MenuItem eventKey="1" className="mItem">20x10</MenuItem>
						<MenuItem eventKey="2" className="mItem">50x30</MenuItem>
						<MenuItem eventKey="3" className="mItem">70x50</MenuItem>
					</DropdownButton>
					
				</ButtonToolbar>
				<Checkbox onChange={this.props.colors} style={{fontSize: "16"}}>Random Colors</Checkbox>
			</div>
			)
	}
}

export default Buttons;