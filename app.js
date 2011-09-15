var Player = Backbone.Model.extend({
    defaults: {
        name: 'Unnamed Player'
    },
    initialize: function(opts) {
    }
});


var DOUBLE_WORD_SCORE = 0;
var TRIPLE_WORD_SCORE = 1;
var DOUBLE_LETTER_SCORE = 2;
var TRIPLE_LETTER_SCORE = 3;

var Board = Backbone.Model.extend({
    defaults: {
        height: 11,
        width: 11,
        modifiers: {
            "0,0": TRIPLE_WORD_SCORE,
            "0,10": TRIPLE_WORD_SCORE,
            "10,0": TRIPLE_WORD_SCORE,
            "10,10": TRIPLE_WORD_SCORE,
            "1,1": TRIPLE_LETTER_SCORE,
            "2,2": TRIPLE_LETTER_SCORE,
            "3,3": TRIPLE_LETTER_SCORE,
            "4,4": TRIPLE_LETTER_SCORE,
            "0,5": DOUBLE_WORD_SCORE,
            "10,5": DOUBLE_WORD_SCORE,
            "5,10": DOUBLE_WORD_SCORE,
            "5,0": DOUBLE_WORD_SCORE
        }
    },
    
    initialize: function(opts) {
    }
    
});

var GameView = Backbone.View.extend({

    className: 'game',

    render: function() {
        jQuery('#game_container').append(this.el);
        jQuery(this.el).append('<div class="board_container"></div>')
                       .append('<div class="hand_container"></div>')

        var board_view = new BoardView({ model: new Board() })
        jQuery(this.el).append( board_view.el )
        board_view.render()

        var hand_view = new HandView({ model: new Hand() })
        jQuery(this.el).append( hand_view.el )
        hand_view.render()
    }
})

var HandView = Backbone.View.extend({
    
    className: 'hand',
    
    render: function() {
        
    }
})
    
var BoardView = Backbone.View.extend({
    
    className: 'board',
    
    render: function() {
        
        var table = jQuery('<table></table>');
        
        for( var h=0 ; h<this.model.get('height') ; h++) {
            var row = jQuery('<tr></tr>');
            for( var w=0 ; w<this.model.get('width') ; w++) {
                var cell = jQuery('<td></td>');
                var modifier = this.model.get('modifiers')[w.toString()+","+h.toString()];
                if(modifier !== undefined) {
                    switch(modifier) {
                        case TRIPLE_WORD_SCORE:
                            cell.addClass('tw');
                            break;
                        case DOUBLE_WORD_SCORE:
                            cell.addClass('dw');
                            break;
                        case TRIPLE_LETTER_SCORE:
                            cell.addClass('tl');
                            break;
                        case DOUBLE_LETTER_SCORE:
                            cell.addClass('dl');
                            break;
                    }
                }
                
                row.append(cell);
            }
            table.append(row)
        }
        
        jQuery(this.el).append(table)
    }
});

var Player = Backbone.Model.extend({
    defaults: {
        name: "Unnamed Player"
    }
});

var dude = new Player();
dude.bind('change:name', function() { console.log("Witness Protection Engaged!") });

var game_view = new GameView();
game_view.render()
