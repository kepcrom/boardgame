// javascript data file

const aspect = 1/1;

const screens_data = new Array(
    {
        background : '#000000',
        content : '<h3>Ready to Play?</h3><p></p><button onclick="state.setState( \'game\', RUNNING )" value="start">Start</button>',
        mode : 1,
        show : true,
        audio : '2A_450.mp3',
    },
    {
        background : '#000000',
        content : '<h3>Good Work!</h3><p></p><button onclick="state.setState(\'game\', REPLAY )">REPLAY</button>',
        mode : 3,
        show : false,
        audio : '2C_450.mp3',
    }
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
