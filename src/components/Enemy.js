import React, { Component } from 'react';

class Enemy extends Component{

	render(){

		return(

			<div className="enemy" style={{top: this.props.enemyY, left: this.props.enemyX}}>


			</div>
		);
	}
}

export default Enemy;