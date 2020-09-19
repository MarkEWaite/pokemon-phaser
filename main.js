// Initialize Phaser, and create a game
var screenWidth = 1024;
var screenHeight = 600;
var game = new Phaser.Game(screenWidth, screenHeight, Phaser.CANVAS, 'gameContainer');

var updatesCounter = 0;
var caughtPokemons = 0;
// var score = 0;
var message = null;

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() {
		game.load.crossOrigin = 'anonymous';

	        // Load a background image
		game.load.image('background', 'https://source.unsplash.com/1024x600/?colorado');

		// See https://www.pokemon.com/us/pokedex/ for the association of Pokemon to number
		game.load.image('pokemon', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'); // charmander
		game.load.image('bulbasaur', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
		game.load.image('ivysaur', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png');
		game.load.image('venusaur', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png');
		game.load.image('charmander', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png');
		game.load.image('charmeleon', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png');
		game.load.image('squirtle', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png');
		game.load.image('wartortle', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png');
		game.load.image('metapod', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png');
		game.load.image('butterfree', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png');
   },

    create: function() {
      	
      	// Set the background image
    	game.add.tileSprite(0, 0, screenWidth, screenHeight, 'background');  
    	// Set the physics system
     	game.physics.startSystem(Phaser.Physics.ARCADE);
     
     	// Create text container and set it to initial value
     	message = game.add.text(0, 0, 'Catch a Pokemon by clicking on it');
	// message.fill = '#FF0000';
    },
     
    update: function() {
	updatesCounter++;
	// Create pokemon only every 100th call of update function
        if(updatesCounter % 100 == 0) {
		createPokemon();    
	}
	message.text = 'Congratulations, you caught ' + caughtPokemons; // + ' Pokemon. Score: ' + score;
    }

};

function createPokemon() {
	// Select initial x position of the pokemon randomly
 	var horizontalPosition = parseInt(screenWidth * Math.random());
 	var verticalPosition = 0;

	// We already have several pre-defined shapes.
	// 'pikachu', 'kyogre', 'bikkuriman', 'bsquadron1'

	// Display the Pokemon on the screen
	var pokemon = game.add.sprite(horizontalPosition, verticalPosition, 'pokemon');

	// Enables all kind of input actions on this image (click, etc)
	pokemon.inputEnabled = true;
		
	// Do stuff when the mouse is clicked over the Pokemon
	pokemon.events.onInputDown.add(function(){
		caughtPokemons++;
		// score += 100; 
		// score += Math.round(pokemon.body.speed);
		pokemon.destroy();
	}, this);


	// Do stuff when the cursor is hovering over the Pokemon	
	pokemon.events.onInputOver.add(function() {
	
	}, this);

	pokemon.checkWorldBounds = true;
	pokemon.events.onOutOfBounds.add(function() {
		// score = Math.max(0, score-100);
		pokemon.destroy();
	}, this);

	// Add gravity to the pokemon to make it fall
	game.physics.arcade.enable(pokemon);
	pokemon.body.gravity.y = 300;
};


// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');

