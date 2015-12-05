Meteor.publish('games', function() {
    return Games.find({status: 'open'});
});


Meteor.methods({
    removePlayerFromGame: function(gameId, player) {
        Meteor.setTimeout(function() {
            var game = Games.findOne(gameId);
            if (game['player2'] == '') {
                // destroy game & move out
                Games.remove(gameId)
            } else { // there's another player in the room
                if (player == game['player1']) {
                    Games.update({_id: gameId},
                        {$set: {player1: game['player2'],
                                player2: '',
                                status: 'open'}});
                } else {
                    Games.update({_id: gameId},
                        {$set: {player2: '',
                                status: 'open'}});
                }
            }
        }, 2000);
    }
});
