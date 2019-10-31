// javascript data file

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
        content : '<h3>Good Work!</h3><p>During hot work activities, you must keep control over the work site and constantly watch out for unsafe conditions.</p><p>Avoiding fire is your main concern.</p><p><i>Click on the Next button to continue the module.</i></p><button onclick="state.setState(\'game\', REPLAY )">REPLAY</button>',
        mode : 3,
        show : false,
        audio : '2C_450.mp3',
    }
)

const walls_data = new Array
(
    { posx:  0, posy:  3, thickness : 1.25, lengthx: 100, lengthy:  0 },
    { posx: 14, posy: 18, thickness : 1.25, lengthx:   0, lengthy: 80 },
    { posx: 28, posy:  3, thickness : 1.25, lengthx:   0, lengthy: 14 },
    { posx: 28, posy: 17, thickness : 1.25, lengthx:  14, lengthy:  0 },
    { posx: 56, posy: 17, thickness : 1.25, lengthx:  14, lengthy:  0 },
    { posx: 56, posy: 17, thickness : 1.25, lengthx:   0, lengthy: 87 },
    { posx: 28, posy: 31, thickness : 1.25, lengthx:  28, lengthy:  0 },
    { posx: 28, posy: 31, thickness : 1.25, lengthx:   0, lengthy: 15 },
    { posx: 42, posy: 43, thickness : 1.25, lengthx:   0, lengthy: 67 },
    { posx: 70, posy: 29, thickness : 1.25, lengthx:  14, lengthy:  0 },
    { posx: 70, posy: 43, thickness : 1.25, lengthx:   0, lengthy: 57 },
    { posx: 84, posy:  3, thickness : 1.25, lengthx:   0, lengthy: 42 },    
);


const pc_instructions = '<b>Use the appropriate keys on the keyboard to move through the maze.</b>';
const mobile_instructions = '<b>Use the direction pad to move through the maze.</b>';
