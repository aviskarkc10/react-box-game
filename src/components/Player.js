import React, { Component } from 'react';

class Player extends Component{
	
	constructor(props){
		
		super(props);

		this.state = {
			height: props.playerHeight,
			width: props.playerWidth,
			top: props.playerY,
			left:props.playerX	

		}
	}

	componentWillMount(){

	}

	render(){


		// console.log(this.props.properties.playerX + " " + this.props.properties.playerY)
		return(

			<div className="player" style={{top: this.props.playerY, left: this.props.playerX}}>


			</div>
		);
	}
}

export default Player;