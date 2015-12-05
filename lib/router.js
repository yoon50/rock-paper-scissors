Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'enterPlayer'});
Router.route('/gamesT', {name: 'showGameRooms',
    onBeforeAction: function() {
        console.log("going to /gamesT!");
        this.next();
    }});
Router.route('/games/:_id', {
    // TODO perform error handling
    name: 'gameRoom',
    onBeforeAction: function() {
        var gameId = this.params._id,
            game = Games.findOne(gameId),
            player = Session.get('player');
        console.log(game);
        // Set current player as player2
        // if this current player didn't create the room
        if (player != game['player1'] &&
                game['player2'] == '') {
            Games.update({_id: gameId}, 
                         {$set: {player2: player, status: 'closed'}});
        }
        this.next();
    },
    data: function() {
        return {
            gameId: this.params._id,
            player: Session.get('player')
        };
    }
});
