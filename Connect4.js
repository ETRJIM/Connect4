var Player1 = prompt("Player One: Enter your name, you will be Red");
var Player1color = 'rgb(237, 45, 73)';
var Player2 = prompt("Player Two: Enter your name, you will be Blue");
var Player2color = 'rgb(86, 151, 255)';
var game_on = true;
var table = $('table tr');

function changeColor(row,col,color){
    return table.eq(row).find('td').eq(col).find('button').css('background-color',color);
}

function returnColor(row,col){
    return table.eq(row).find('td').eq(col).find('button').css('background-color');
}

function checkBottom(col){
    var colorReport = returnColor(5,col);
    for(var row = 5;row>-1; row--){
        colorReport = returnColor(row,col);
        if(colorReport==='rgb(128, 128, 128)'){
            return row
        }
    }
}

function colorMatchCheck(one,two,three,four){
    return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWin(){
    for(var row = 0;row<6;row++){
        for(var col=0;col<4;col++){
            if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))){
                return true;
            }
        }
    }
}

function verticalWin(){
    for(var col = 0;col<7;col++){
        for(var row=0;row<3;row++){
            if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))){
                return true;
            }
        }
    }
}

function diagonalWin(){
    for(var col = 0;col<5;col++){
        for(var row=0;row<7;row++){
            if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))){
                return true;
            }else if((colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3)))){
                return true;
            }
        }
    }
}



var currentPlayer = 1;
var currentName = Player1;
var currentcolor = Player1color;

$('h3').text(Player1+" it is your turn,pick a column to drop in your chip!")
$('button').on('click',function(){
    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail,col,currentcolor);
    if (horizontalWin() || verticalWin() || diagonalWin()){
        $('h1').text(currentName+' You have won!');
        $('h2').text('reload the page to restart');
        $('h3').fadeOut('fast');
        $('button').off()
    }
    currentPlayer = currentPlayer * -1;
    if (currentPlayer === 1){
        $('button').one()
        currentName = Player1;
        $('h3').text(currentName + ' it is your trun.')
        currentcolor = Player1color
    }else{
        $('button').one()
        currentName = Player2;
        $('h3').text(currentName + ' it is your trun.') 
        currentcolor = Player2color;
    }
})