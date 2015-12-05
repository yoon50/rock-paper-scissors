Meteor.subscribe('games');

/*
Games.find().observeChanges({
    changed: function(id, fields) {
        
    }
}) ; */

/*
window.onbeforeunload = function(event) {
    // TODO
    // for any rooms where user was in
    // take the user name off
    // if user was in that room last
    // remove the room
    return "YEAH!"
}*/

Template.enterPlayer.events({
    "submit .enter-player": function(event) {
        event.preventDefault();
        var name = event.target.text.value;
        // TODO remove this call
        // make an 'enterPlayer/registerPlayer/addPlayer' methood
        Players.insert({
            name: name,
            createdAt: new Date()
            }, function(err, playerId) {
                // TODO
                // handle error and save playerId?
                Session.set('player', name);
                Router.go('/gamesT');
            }
        );
    }
}); 


Template.createGameRoom.events({
    "submit .create-game-room": function(event) {
        event.preventDefault();
        Games.insert({
            status: 'open',
            player1: Session.get('player'),
            player2: '',
            createdAt: new Date()
            }, function(err, gameId) {
                if (err) {
                    //TODO do something
                    console.log(err);
                }
                Session.set('gameId', gameId);
                Router.go('/games/' + gameId);
            }
        );
    }
});


Template.showGameRooms.helpers({
    games: function() {
        // TODO show game details cleanly
        // GameId - playerName 
        return Games.find({}); 
    }
});



Template.gameRoom.events({
    "click #exit-room": function(event) {
        event.preventDefault();
        var player = Session.get('player');
        var gameId = Session.get('gameId');
        Meteor.call('removePlayerFromGame', gameId, player);
        Router.go('/gamesT');
    },
});

















