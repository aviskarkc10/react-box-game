import React, { Component } from 'react';

import Player from './Player';
import Enemy from './Enemy';

class Container extends Component{

	
	constructor(props){
		super(props);
		this.state = {
			containerHeight: props.properties.containerHeight,
			containerWidth: props.properties.containerWidth,
			playerHeight: props.properties.playerHeight,
			playerWidth: props.properties.playerWidth,
			playerX: props.properties.playerX,
			playerY: props.properties.playerY,
			playerProps: []

		}

	}

	componentWillMount = () => {

		let {containerHeight, containerWidth, ...tempProps} = this.state;
		this.setState({
			playerProps: tempProps
		})
	}

	render() {	

		return(
			<div className="container">
				{/* <Player playerHeight = {this.props.properties.playerHeight} playerWidth = {this.props.properties.playerWidth}
					playerX = {this.props.properties.playerX}
					playerY = {this.props.properties.playerY} /> */}

				
					
				{/* {
					this.props.properties.enemies && this.props.properties.enemies.length>0 && this.props.properties.enemies.map(singleEnemy => {
						
						return(
							<Enemy key={singleEnemy.id} enemyX = {singleEnemy.enemyX} enemyY = {singleEnemy.enemyY}/>
						);

					})
				} */}
			</div>
		);
	}

}

export default Container;