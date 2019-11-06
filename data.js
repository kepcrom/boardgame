// javascript data file

aspect = new Array(1,1);

const board_image = function(){ return( 'images/gameboard.jpg' ) };

const dice_data = new Array(
    {
        range : 6,
    },
    {
        range : 6,
    }
);

const screens_data = new Array(
    {
        background : '#000000',
        color: '#FFFFFF',
        content : '<center><h3>Ready to Play?</h3>Click on the button below to start.</center>',
        mode : 'MODE_NOTSTARTED',
        show : true,
        audio : '2A_450.mp3',
    },
    {
        background : '#000000',
        color: '#FFFFFF',
        content : '<h3>Good Work!</h3>',
        mode : 'MODE_FINISHED_SUCCESS',
        show : false,
        audio : '2C_450.mp3',
    }
)

const interactions_data = new Array(
    {
        content : 'Start',
        type: 'button',
        width: 20,
        height: 20,
        mode: 'MODE_NOTSTARTED',
        newmode: 'MODE_RUNNING',
    },
    {
        content : 'Roll Dice',
        type: 'button',
        width: 20,
        height: 20,
        mode: 'MODE_RUNNING',
        newmode: 'MODE_RUNNING',
        onclick: function(e){
            let move_inc = RollDice();
            MovePlayer( move_inc );
         },
    }
)

const players_data = new Array
(
    { name: 'Billy', active: true },
    { name: 'Sarah', active: false },
)

const walls_data = new Array
(
    { posx: 20, posy: 20, thickness : 1.25, lengthx:  60, lengthy:  0 },
    { posx: 20, posy: 20, thickness : 1.25, lengthx:   0, lengthy: 60 },
    { posx: 80, posy: 20, thickness : 1.25, lengthx:   0, lengthy: 60 },
    { posx: 20, posy: 80, thickness : 1.25, lengthx:  60, lengthy:  0 },
);

const hits_data = new Array
(
    { posx:  0, posy:  0, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 20, posy:  0, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 40, posy:  0, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 60, posy:  0, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 80, posy:  0, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx:  0, posy: 20, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx:  0, posy: 40, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx:  0, posy: 60, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx:  0, posy: 80, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 80, posy: 20, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 80, posy: 40, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 80, posy: 60, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 80, posy: 80, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 20, posy: 80, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 40, posy: 80, width: 20, height: 20, on: 'blow_hit',      frame : 0 },
    { posx: 60, posy: 80, width: 20, height: 20, on: 'blow_congrats', frame : 0 },
);

const pc_instructions = '<b>Use the appropriate keys on the keyboard to move through the maze.</b>';
const mobile_instructions = '<b>Use the direction pad to move through the maze.</b>';

function init_game()
{
    var state = game.getState();
    for( var i = 0; i < players_data.length; i++ )
    {
        if( !state['players'] )
            state['players'] = new Array();
        var obj = new Player();
        for( prop in players_data[i] )
        {
            obj.addProp( prop, players_data[i][prop] );
        }
        state['players'].push( obj );
    }
    for( var i = 0; i < screens_data.length; i++ )
    {
        if( !state['cards'] )
            state['cards'] = new Array();
        var obj = new Card();
        for( var prop in screens_data[i] )
        {
            if( prop == 'mode' )
                obj.addProp( prop, state[screens_data[i][prop]] );
            else
                obj.addProp( prop, screens_data[i][prop] );
        }
        state['cards'].push( obj );
    }
    for( var i = 0; i < interactions_data.length; i++ )
    {
        if( !state['interactions'] )
            state['interactions'] = new Array();
        var obj = new Interaction();
        obj.addProp( 'content', interactions_data[i]['content'] );
        obj.addProp( 'type',    interactions_data[i]['type'] );
        obj.addProp( 'mode',    state[interactions_data[i]['mode']] );
        obj.addProp( 'newmode', interactions_data[i]['newmode'] );
        obj.addProp( 'width',   interactions_data[i]['width'] );
        obj.addProp( 'height',  interactions_data[i]['height'] );
        if( interactions_data[i]['onclick'] )
        {
            obj.addProp( 'onclick', interactions_data[i]['onclick'] );
        }
        state['interactions'].push( obj );
    }
    game.setState( state );
    game.build();
}

function RollDice()
{
    const d6a = Math.floor( Math.random() * 6 ) + 1;
    const d6b = Math.floor( Math.random() * 6 ) + 1;
    return( d6a + d6b );
}

function MovePlayer( dist )
{
    let state = game.getState();
    if( !state['players'] )
        return;
    let next_active = 0;
    for( var i = 0; i < state['players'].length; i++ )
    {
        if( state['players'][i]['active'] )
        {
            state['players'][i].Move( dist );
            state['players'][i]['active'] = false;
            if( i + 1 < state['players'].length )
                next_active += 1;
        }
    }
    state['players'][next_active]['active'] = true;
}