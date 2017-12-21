import React, { Component } from 'react';

import Container from './Container';
import Enemy from './Enemy';
import Player from './Player';

class GameController extends Component{

	constructor() {

		super();

		this.state = {
			game: true,
			score: 0,
			containerHeight: 400,
			containerWidth: 600,
			playerHeight: 40,
			playerWidth: 40,
			playerX: 300,
			playerY: 200,
			playerVelocity: 10,
			enemiesNumber: 3,
			enemyHeight: 40,
			enemyWidth: 40,
			enemies: {
				id: '',
				enemyX:'',
				enemyY:'',
				velocityX:'',
				velocityY:''
			},
			keyDown: '',
			keyUp: false,
			properties:''
		}

		this.initialState = this.state;

	}


	gameLoop = () => {

		if(this.state.game){
			document.onkeydown = (e) => {
				this.checkKeyDown(e);
				
			}

			document.onkeyup = (e) => {

				this.checkKeyUp(e);
			}

			this.setProps();
			this.moveEnemy();
			this.checkCollision();
			
			// this.state.enemies.forEach(enemy => {

			// 	console.log(enemy);
			// });
			window.requestAnimationFrame(this.gameLoop)

		}

	}

	restartGame = () => {
		
		this.setState(this.initialState);
		// this.gameLoop();

	}

	checkCollision = () => {


		if(this.state.enemies[0]) {
			for(let i=0;i<this.state.enemiesNumber;i++){

				let enemy = this.state.enemies[i];

				if ((enemy && enemy.enemyX < this.state.playerX + this.state.playerWidth &&
					enemy.enemyX + this.state.enemyWidth > this.state.playerX &&
					enemy.enemyY < this.state.playerY + this.state.playerHeight &&
					this.state.enemyHeight + enemy.enemyY > this.state.playerY)) {

					this.setState({
						game: false
					})
					this.restartGame();

				}

			}
		}
		
	}

	moveEnemy = () => {

		let tempEnemy = [];
		let tempScore = this.state.score;
		
		for(let i=0; i< this.state.enemiesNumber;i++){
			let enemy = this.state.enemies[i];

			if(!enemy || (enemy && (enemy.enemyX<-this.state.enemyWidth || enemy.enemyX>this.state.containerWidth

			|| enemy.enemyY<-this.state.enemyHeight || enemy.enemyY>this.state.containerHeight))) {

				//reuse the Enemy
				
				//set Position
				if(enemy){
					tempScore += 1;
				}


				let position = Math.floor(Math.random()*4);

				//set X and Y

				let tempX;
	  			let tempY;
	  			let tempVelocityX;
	  			let tempVelocityY;
	  			

	  			switch(position) {

	  				case 0:
	  					//spawn from left
	  					tempX = -this.state.enemyWidth;
	  					tempY = this.state.playerY;
	  					tempVelocityY = 0;
	  					tempVelocityX = 2;
	  					break;

	  				case 1:
	  					//spawn from right
	  					tempX = this.state.containerWidth;
	  					tempY = this.state.playerY;
	  					tempVelocityY = 0;
	  					tempVelocityX = -2;
	  					break;

	  				case 2:
	  					//spawn from top
	  					tempX = this.state.playerX;
	  					tempY = -this.state.enemyHeight;
	  					tempVelocityY = 2;
	  					tempVelocityX = 0;
	  					break;

	  				case 3:
	  					//spawn from bottom
	  					tempX = this.state.playerX;
	  					tempY = this.state.containerHeight;
	  					tempVelocityY = -2;
	  					tempVelocityX = 0;
						  break;
					
					default:
						break;
	  			}

	  			tempEnemy[i] = {
	  				id: i,
	  				enemyX: tempX,
	  				enemyY: tempY,
	  				velocityX: tempVelocityX,
	  				velocityY: tempVelocityY
	  			}

				
				

			}

			else if(enemy){

				//move enemy


				enemy.enemyX = enemy.enemyX + enemy.velocityX;
				enemy.enemyY = enemy.enemyY + enemy.velocityY;
				tempEnemy[i] = enemy;

			

			}

			// if(enemy)
			// 	tempEnemy[i] = enemy;
				
				
					
			if((i===(this.state.enemiesNumber-1)) && tempEnemy.length>0){
				this.setState({
					enemies: tempEnemy,
					score: tempScore
				});
			}

				
		}
		
	}

	movePlayer = () =>{

		if(this.state.keyUp) {
			if(this.state.keyDown === "left" && (this.state.playerX)>0) {
				let temp = this.state.playerX - this.state.playerVelocity;
				this.setState({
					playerX: temp
				});

			}

			else if(this.state.keyDown === "right" && (this.state.playerX)<(this.state.containerWidth-this.state.playerWidth)) {
				let temp = this.state.playerX + this.state.playerVelocity;
				this.setState({
					playerX: temp
				});
			}

			else if(this.state.keyDown === "up" && (this.state.playerY)>0) {
				let temp = this.state.playerY - this.state.playerVelocity;
				this.setState({
					playerY: temp
				});
			}

			else if(this.state.keyDown === "down" && (this.state.playerY)<(this.state.containerHeight-this.state.playerHeight)) {
				let temp = this.state.playerY + this.state.playerVelocity;
				this.setState({
					playerY: temp
				});
			}
		}

		// console.log(this.state.playerX+" "+this.state.playerX)


	}

	checkKeyDown = function (e) {

  		if (e.keyCode === 37) {
       	// left arrow
       		
       		this.setState({
       			keyDown: "left",
       			keyup: false
       		}, this.movePlayer());

    	}

    	else if (e.keyCode === 39) {
       // right arrow
       		this.setState({
       			keyDown: "right",
       			keyup: false
       		}, this.movePlayer());
       		
    	}
    	
    	else if (e.keyCode === 38){
    		//up arrow
    		this.setState({
       			keyDown: "up" ,
       			keyup: false
       		}, this.movePlayer());

    	}

		if (e.keyCode === 40){
    		//down arrow
    		this.setState({
       			keyDown: "down",
       			keyup: false
       		}, this.movePlayer());

    	}    	
  	}

  	checkKeyUp = function (e) {

  		if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
       	// left arrow
       		
       		this.setState({
       			keyUp: true
       		}, this.movePlayer());

    	}
    }

  	setProps = () => {

  		let {game, keyDown, ...props} = this.state;
		this.setState({
			properties: props
		});
  	}

  	

	componentWillMount() {
		// this.spawnEnemy();
		this.gameLoop();
	}

	render() {
		
		return(
			<div className="container">

				{/* <Container properties={this.state.properties} /> */}
				<Player playerHeight = {this.state.playerHeight} playerWidth = {this.state.playerWidth}
					playerX = {this.state.playerX}
					playerY = {this.state.playerY} />

				{
					this.state.enemies && this.state.enemies.length>0 && this.state.enemies.map(singleEnemy => {
						
						return(
							<Enemy key={singleEnemy.id} enemyX = {singleEnemy.enemyX} enemyY = {singleEnemy.enemyY}/>
						);

					})
				}
				<div className="score">Score: {this.state.score}</div>
				
			</div>
		);
	}
}


export default GameController;