import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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

class Main extends React.Component {
	constructor() {
		super();
		this.speed = 200;
		this.rows = 50;
		this.cols = 70;

		this.state = {
			generation: 0,
			gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
			colors: false
		}
	}

	selectBox = (row, col) => {
		let gridCopy = arrayClone(this.state.gridFull);
		gridCopy[row][col] = !gridCopy[row][col];
		this.setState({
			gridFull: gridCopy
		});
	}

	seed = () => {
		let gridCopy = arrayClone(this.state.gridFull);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[i][j] = true;
				}
			}
		}
		this.setState({
			gridFull: gridCopy
		});
	}

	playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
	}

	pauseButton = () => {
		clearInterval(this.intervalId);
	}

	slow = () => {
		this.speed = 1000;
		this.playButton();
	}

	fast = () => {
		this.speed = 200;
		this.playButton();
	}

	hyper = () => {
		this.speed = 10;
		this.playButton();
	}

	clear = () => {
		var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			gridFull: grid,
			generation: 0
		});
	}

	gridSize = (size) => {
		switch (size) {
			case "1":
				this.cols = 20;
				this.rows = 10;
				document.body.style.height = "100vh";
			break;
			case "2":
				this.cols = 50;
				this.rows = 30;
				document.body.style.height = "100%";
			break;
			default:
				this.cols = 70;
				this.rows = 50;
				document.body.style.height = "100%";
		}
		this.clear();
		this.seed()

	}

	play = () => {
		let g = this.state.gridFull;
		let g2 = arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
		}
		this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
		});

	}

	colors = (e) =>{
		this.setState({
			colors: e.target.checked
		})
		console.log(e.target.checked)
	}

	componentDidMount() {
		this.seed();
		this.playButton();
	}

	render() {
		return (
			<div>
				<h1>The Game of Life</h1>
				<Buttons
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					slow={this.slow}
					fast={this.fast}
					hyper={this.hyper}
					clear={this.clear}
					seed={this.seed}
					gridSize={this.gridSize}
					colors= {this.colors}
					step={this.play}
				/>
				<Grid
					gridFull={this.state.gridFull}
					rows={this.rows}
					cols={this.cols}
					selectBox={this.selectBox}
					colors={this.state.colors}
				/>
				<h2>Generations: {this.state.generation}</h2>
				<br/>
				<br/>
				<div className="infoContainer">
					<h1>Rules</h1>
					<br/>
					<ul style={{alignSelf: "center", width: "100%", fontSize:"16"}}>
						<li>Any live cell with fewer then two live neighbours dies - Under-Pop.</li>
						<li>Any live cell with two or three live neighbours live on the next generation - Perfect-Pop.</li>
						<li>Any live cell with 4+ neighbours dies - Over-Pop.</li>
						<li>Ant Dead cell with exactly 3 neighbours becomes alive - Reproduction</li>
					</ul>
					<br/>
					<br/>
					<h1>Algorithm</h1>
					<br/>
					<p style={{wordWrap: 'break-word'}}>Each interation the program will make a new blank grid then will check the neighbours in a 3x3 area around for live cells.
						It then gets the count of live neighbours if under populated the cell dies if perfect populated cell lives if over populated
						cell dies, if dead and the conditions are just right then become alive. This cell is then saved to the new grid. After all cells
						have been checked save the new grid as the current grid.
					</p>
				</div>
				<br/>
			</div>
		);
	}
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));

