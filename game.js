let game = ( function()
{
    let state_hist_count = 0;
    let state_hist = new Array();
    let state = {        
        MODE_NOTSTARTED : 1,
        MODE_RUNNING : 2,
        MODE_FINISH_SUCCESS : 3,
        MODE_FINISH_FAILURE : 4,
        MODE_RESTART : 5,
        mode : 1,
        modecontrols : new Array(   [ 1, 2 ],
                                    [ 2, 4 ],
                                    [ 2, 3 ],
                                    [ 3, 5 ],
                                    [ 4, 5 ],
                                    [ 5, 1 ] ),
};

    function _setState( newState )
    {
        if( ! objectMatch( state, newState ) )
        {
            _storeState();
        }
        else
        {
            return;
        }
        state = newState;
    }

    function _storeState()
    {
        state_hist.push( objectClone( state, true ) );
    }

    function _getState()
    {
        var newstate = objectClone( state );
        return newstate;
    }

    function _build()
    {
        var table = document.getElementById('tabletop');
        var gameboardImage = document.getElementById('gameboard_image');
        aspect = new Array( gameboardImage.naturalWidth, gameboardImage.naturalHeight );
        var board_width = 0;
        var board_height = 0;
            board_width = table.clientWidth;
            board_height = board_width * ( aspect[1]/aspect[0] );    
            if( board_height > table.clientHeight )
            {
                board_height = table.clientHeight
                board_width = board_height * ( aspect[0]/aspect[1] );
            }
        var board = document.createElement('DIV')
            board['id'] = 'gameboard';
            board['style'].width = board_width + 'px';
            board['style'].height = board_height + 'px';
            board['style'].backgroundImage = "url(" + gameboardImage.src + ")";
        table.appendChild(board);

        for( var item in state )
        {
            if( typeof(state[item]) === 'object' && state[item].length )
            {
                for( var i = 0; i < state[item].length; i++ )
                {
                    if( 'BuildUI' in state[item][i] )
                    {
                        if( !('mode' in state[item][i]) || state[item][i]['mode'] == state['mode'] )
                        {
                            board.appendChild(state[item][i].BuildUI());    
                        }
                    }
                }
            }
        }
        setTimeout( function(){ _update(); }, 100 );
    }

    function _changeGameMode( newmode )
    {
        if( newmode == state['mode'] )
            return;

        var tempstate = _getState();

        if( _canChange( tempstate['mode'], newmode ) )
        {
            tempstate['mode'] = newmode;
            _setState( tempstate );
        }
    }

    function _canChange( mode1, mode2 )
    {
        if( !state['modecontrols'] )
            return ( true );
        for( var i = 0; i < state['modecontrols'].length; i++ )
        {
            if( state['modecontrols'][i][0] == mode1 && state['modecontrols'][i][1] == mode2 )
                return ( true );
        }
        return ( false );
    }

    function _update()
    {
        if( state_hist.length > state_hist_count )
        {
            var table = document.getElementById('tabletop');
            var board = document.getElementById('gameboard');
            table.removeChild(board);
            _build();
            state_hist_count = state_hist.length;
        }
        else
        {
            setTimeout( function(){ _update(); }, 100 );
        }
    }

    return({ setState   : _setState,
             getState   : _getState,
             storeState : _storeState,
             build      : _build,
             hist       : state_hist,
             changeGameMode : _changeGameMode });

})();

function getCenterDimension( type, size )
{
    var board = document.getElementById('gameboard');
    var centerx = (board.clientWidth * .5);
    var centery = (board.clientHeight * .5);
    switch( type )
    {
        case 'y':
            return( centery - (size * .5) );
            break;
        case 'x':
            return( centerx - (size * .5) );
            break;
        default:
            return( size );
            break;
    }
}

function getDimension( type, dist )
{
    var board = document.getElementById('gameboard');
    switch( type )
    {
        case 'y':
            return( dist * (board.clientHeight/100) );
            break;
        case 'x':
            return( dist * (board.clientWidth/100) );
            break;
        default:
            return( dist );
    }
}

function getLocation( x, y )
{
    var board = document.getElementById('gameboard');
    var posx = getDimension('x',x);
    var posy = getDimension('y',y);
    return( [ posx, posy ] );
}

function objectMatch( a, b )
{
    let aProps = Object.getOwnPropertyNames( a );
    let bProps = Object.getOwnPropertyNames( b );

    if( aProps.length != bProps.length )
    {
        return false;
    }

    for( var i = 0; i < aProps.length; i++ )
    {
        if( a[aProps[i]] !== b[aProps[i]] )
        {
            return false;
        }
    }

    return true;
}

function objectClone( object, deref )
{
    let target = {};
    for( let prop in object )
    {
        if( (typeof( object[prop] ) === 'function' || typeof( object[prop] ) === 'object') && !object[prop].length )
        {
            target[prop] = objectClone( object[prop] );
        }
        else
        {
            if( deref )
            {
                if( typeof( object[prop] ) === 'object' && object[prop].length )
                {
                    target[prop] = new Array();
                    for( var i = 0; i < object[prop].length; i++ )
                    {
                        if( typeof( object[prop] ) === 'function' || typeof( object[prop] ) === 'object' )
                        {
                            target[prop].push( objectClone( object[prop][i] ) );
                        }
                        else
                        {
                            target[prop].push( object[prop][i] );
                        }
                    }
                }
                else
                {
                    target[prop] = object[prop];
                }
            }            
            else
            {
                target[prop] = object[prop];
            }

        }
    }
    return target;
f}

function add_player( data )
{
    var state = game.getState();
    var player = new Player();
    for( let prop in data )
    {
        player.addProp( prop, data[prop] );
    }
    if( state['players'] )
        state['players'].push( player );
    game.setState( state );
}

// PROTOTYPES

let player_uid = 1;

function Player()
{
    this['id'] = player_uid++;
    this['frames'] = new Array();
    this['position'] = 0;
    this['posx'] = 0;
    this['posy'] = 0;
}

Player.prototype.addProp = function( prop, value ) {
    this[prop] = value;
}

// Player.prototype.BuildUI = function() {
//     var sprite = document.createElement('DIV');
//         sprite['id'] = 'player_' + this['id'];
//         sprite['className'] = 'player_sprite';
//         if( this['frames'][0] )
//             sprite['style']['backgroundImage'] = 'url("'+ this['frames'][0] +'")';
// }

Player.prototype.Move = function( dist ) {
    game.storeState();
    this['position'] += dist;
    console.log( 'player ' + this['name'] + ' has moved to postion ' + this['position'] );
}

let screen_uid = 1;

function Card()
{
    this['id'] = screen_uid++;
}

Card.prototype.addProp = function( prop, value ) {
    this[prop] = value;
}

Card.prototype.BuildUI = function() {
    var block = document.createElement('DIV');
        block['id'] = 'card_' + this['id'];
        block['className'] = 'card';
        block['style'].backgroundColor = this['background'];
        block['style'].color = this['color'];
        block['innerHTML'] = this['content'];
    return block; 
}

let interaction_uid = 1;

function Interaction()
{
    this['id'] = 'ui_' + interaction_uid++;
}

Interaction.prototype.addProp = function( prop, value ) {
    this[prop] = value;
}

Interaction.prototype.BuildUI = function() {
    var ui = false;
    var state = game.getState();
    if( this['type'] == 'button' )
    {
        ui = document.createElement('BUTTON');
        ui.innerHTML = this['content'];
        ui.value = this['content'];
        ui.style.width  = getDimension('x', this['width']);
        ui.style.height = getDimension('y', this['height']);
        ui.style.top    = getCenterDimension('y', getDimension('y', this['height']));
        ui.style.left   = getCenterDimension('x', getDimension('x', this['width']));
        ui.setAttribute( 'newmode', state[this['newmode']] );
        if( typeof(this['onclick']) === 'function' )
        {
            ui.addEventListener( 'click', this['onclick'] );
        }

        ui.addEventListener( 'click', function(){ game.changeGameMode( parseInt( this.getAttribute('newmode') ) ); });
    }
    return( ui );
}
