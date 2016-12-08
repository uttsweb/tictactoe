var ticTacToe = (function() {

    //------------------- VARIABLES ---------------------------------------
    firstUser = {
        'name': '',
        'win': 0,
        'lose': 0,
        'tie': 0
    }

    secondUser = {
        name: '',
        'win': 0,
        'lose': 0,
        'tie': 0
    }

    var _isCross;
    var tdTag;
    var img;
    var firstPlayer;
    var nextPlayer;
    var symbol;
    var HTML;
    var playerOneCount = 0;
    var playerTwoCount = 0;



    //----------- GET USER INFO ------------------------------------------------
    function getUserInfo() {
        firstUser.name = prompt("PLEASE ENTER FIRST PLAYER'S NAME");
        while (firstUser.name == null || firstUser.name.replace(/ /g, '') === '') {
            firstUser.name = prompt("PLEASE ENTER SECOND PLAYER'S NAME");
        }

        secondUser.name = prompt("Player 2 name")

        while (secondUser.name == null || firstUser.name.toUpperCase() == secondUser.name.toUpperCase() || secondUser.name.replace(/ /g, '') === '') {
            secondUser.name = prompt("NAME FIELD CANNOT HAS SAME NAME");
        }
        document.getElementById("playerOne").innerHTML = "[" + " " + firstUser.name.toUpperCase() + " " + "]";
        document.getElementById('playerTwo').innerHTML = "[" + " " + secondUser.name.toUpperCase() + " " + "]";
    }
    //------------------GENERATE GAME BOARD  -----------------------------------


    function generateGameBoard() {


        HTML = "<table id='mainTable'>"
        HTML += "<tr>"
        HTML += "<td id='col1' class='t_row'></td>"
        HTML += "<td id='col2' class='t_row'></td>"
        HTML += "<td id='col3' class='t_row'></td>"
        HTML += "</tr>"

        HTML += "<tr>"
        HTML += "<td id='col4' class='t_row'></td>"
        HTML += "<td id='col5' class='t_row'></td>"
        HTML += "<td id='col6' class='t_row'></td>"
        HTML += "</tr>"

        HTML += "<tr>"
        HTML += "<td id='col7' class='t_row'></td>"
        HTML += "<td id='col8' class='t_row'></td>"
        HTML += "<td id='col9' class='t_row'></td>"
        HTML += "</tr>"

        HTML += "</table>";

        document.getElementById("outputDiv").innerHTML = HTML;

    }

    // ------------------ SELECT THE BOX -------------------------------

    function selectSquare() {

        _isCross = true;
        tdTag = document.getElementsByClassName('t_row');
        for (var i = 0; i < tdTag.length; i++) {
            tdTag[i].addEventListener('click', function() {
                if (this.innerHTML === '') {
                    img = document.createElement("img");
                    if (_isCross) {
                        img.setAttribute('src', 'img/x.png');
                    } else {

                        img.setAttribute('src', 'img/o.png');
                    }
                    img.style.width = '60px';
                    img.style.height = '60px';
                    this.append(img);
                    _isCross = !_isCross;
                } else {
                    alert('SORRY CANNOT CHOOSE THE SAME BOX');
                }
                //get Tile Image X or O
                checkGameState();
            })
        }
    };

    // --------------GET FIRST PLAYER----------------------------------------

    function getFirstPlayer() {
        var players = [firstUser.name, secondUser.name];
        firstPlayer = players[Math.floor(Math.random() * players.length)];
        if (players.length > 1) {
            do {
                nextPlayer = players[Math.floor(Math.random() * players.length)];
            } while (firstPlayer == nextPlayer);
        }
        document.getElementById('info').innerHTML = firstPlayer.toUpperCase() + " " + " " + "[ X ]";
        document.getElementById('player1result').innerHTML = firstPlayer;
        document.getElementById('player2result').innerHTML = nextPlayer;

    };

    // ----------------  Next Round Function -----------------------------------

    function nextRound() {

        for (var i = 0; i < tdTag.length; i++) {
            tdTag[i].addEventListener('click', function() {
                if (_isCross) {
                    document.getElementById('info').innerHTML = firstPlayer.toUpperCase() + " " + " " + "[ X ]";

                } else {
                    document.getElementById('info').innerHTML = nextPlayer.toUpperCase() + " " + " " + "[ O ]";
                }

            })

        }

    };




    var tileImg = function(tile) {
        if (tile.children.length !== 0) {
            var img = tile.children[0];
            img.src.includes('x.png') ? symbol = 'x' : symbol = 'o';
            return symbol;
        }
    };

    var tileId = function(id) {
        return document.getElementById(id);
    }

    var checkBlankGameBoard = function() {
        var t_rows = document.getElementsByClassName('t_row');
        //check every tile in play field
        for (var i = 0; i < t_rows.length; i++) {
            if (t_rows[i].children.length !== 0) return true;
        }

        return false;
    }

    var checkDraw = function() {
        var t_rows = document.getElementsByClassName('t_row');
        //check every tile in play field
        for (var i = 0; i < t_rows.length; i++) {
            if (t_rows[i].innerHTML === '') return false;
        }

        return true;
    }

    // WIN LOSS ALGORITHM  ----------------------------------------------------

    function checkGameState() {
        //check game state when the board is not empty
        if (checkBlankGameBoard()) {

            //check for first row

            if (tileImg(tileId('col1')) === tileImg(tileId('col2')) && tileImg(tileId('col1')) === tileImg(tileId('col3')) && (tileImg(tileId('col1')) === 'x' || tileImg(tileId('col1')) === 'o')) {
                if (tileImg(tileId('col1')) === 'x') {
                    alert(firstPlayer + " " + 'Win !!');
                    firstUser.win += 1;
                    secondUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col1.style.background = "orange";
                    col2.style.background = "orange";
                    col3.style.background = "orange";
                } else if (tileImg(tileId('col1')) === 'o') {
                    alert(nextPlayer + " " + 'Win !!');
                    secondUser.win += 1;
                    firstUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col1.style.background = "orange";
                    col2.style.background = "orange";
                    col3.style.background = "orange";
                }
            }

            // //check for second row

            if (tileImg(tileId('col4')) === tileImg(tileId('col5')) && tileImg(tileId('col4')) === tileImg(tileId('col6')) && (tileImg(tileId('col4')) === 'x' || tileImg(tileId('col4')) === 'o')) {
                if (tileImg(tileId('col4')) === 'x') {
                    alert(firstPlayer + " " + 'Win !!');
                    firstUser.win += 1;
                    secondUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col4.style.background = "orange";
                    col5.style.background = "orange";
                    col6.style.background = "orange";
                } else if (tileImg(tileId('col4')) === 'o') {
                    alert(nextPlayer + " " + 'Win !!');
                    secondUser.win += 1;
                    firstUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col4.style.background = "orange";
                    col5.style.background = "orange";
                    col6.style.background = "orange";
                }
            }


            // //check for third row


            if (tileImg(tileId('col7')) === tileImg(tileId('col8')) && tileImg(tileId('col7')) === tileImg(tileId('col9')) && (tileImg(tileId('col7')) === 'x' || tileImg(tileId('col7')) === 'o')) {
                if (tileImg(tileId('col7')) === 'x') {
                    alert(firstPlayer + " " + 'Win !!');
                    firstUser.win += 1;
                    secondUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col7.style.background = "orange";
                    col8.style.background = "orange";
                    col9.style.background = "orange";

                } else if (tileImg(tileId('col7')) === 'o') {
                    alert(nextPlayer + " " + 'Win !!');
                    secondUser.win += 1;
                    firstUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col7.style.background = "orange";
                    col8.style.background = "orange";
                    col9.style.background = "orange";
                }
            }

            // //check for first column

            if (tileImg(tileId('col1')) === tileImg(tileId('col4')) && tileImg(tileId('col1')) === tileImg(tileId('col7')) && (tileImg(tileId('col1')) === 'x' || tileImg(tileId('col1')) === 'o')) {
                if (tileImg(tileId('col1')) === 'x') {
                    alert(firstPlayer + " " + 'Win !!');
                    firstUser.win += 1;
                    secondUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col1.style.background = "orange";
                    col4.style.background = "orange";
                    col7.style.background = "orange";

                } else if (tileImg(tileId('col1')) === 'o') {
                    alert(nextPlayer + " " + 'Win !!');
                    secondUser.win += 1;
                    firstUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col1.style.background = "orange";
                    col4.style.background = "orange";
                    col7.style.background = "orange";
                }
            }

            // //check for second column

            if (tileImg(tileId('col2')) === tileImg(tileId('col5')) && tileImg(tileId('col2')) === tileImg(tileId('col8')) && (tileImg(tileId('col2')) === 'x' || tileImg(tileId('col2')) === 'o')) {
                if (tileImg(tileId('col2')) === 'x') {
                    alert(firstPlayer + " " + 'Win !!');
                    firstUser.win += 1;
                    secondUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col2.style.background = "orange";
                    col5.style.background = "orange";
                    col8.style.background = "orange";
                } else if (tileImg(tileId('col2')) === 'o') {
                    alert(nextPlayer + " " + 'Win !!');
                    secondUser.win += 1;
                    firstUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col2.style.background = "orange";
                    col5.style.background = "orange";
                    col8.style.background = "orange";
                }
            }

            // //check for third column

            if (tileImg(tileId('col3')) === tileImg(tileId('col6')) && tileImg(tileId('col3')) === tileImg(tileId('col9')) && (tileImg(tileId('col3')) === 'x' || tileImg(tileId('col3')) === 'o')) {
                if (tileImg(tileId('col3')) === 'x') {
                    alert(firstPlayer + " " + 'Win !!');
                    firstUser.win += 1;
                    secondUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col3.style.background = "orange";
                    col6.style.background = "orange";
                    col9.style.background = "orange";
                } else if (tileImg(tileId('col3')) === 'o') {
                    alert(nextPlayer + " " + 'Win !!');
                    secondUser.win += 1;
                    firstUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col3.style.background = "orange";
                    col6.style.background = "orange";
                    col9.style.background = "orange";
                }
            }
            // //check for diagonal 1

            if (tileImg(tileId('col1')) === tileImg(tileId('col5')) && tileImg(tileId('col1')) === tileImg(tileId('col9')) && (tileImg(tileId('col1')) === 'x' || tileImg(tileId('col1')) === 'o')) {
                if (tileImg(tileId('col1')) === 'x') {
                    alert(firstPlayer + " " + 'Win !!');
                    firstUser.win += 1;
                    secondUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col1.style.background = "orange";
                    col5.style.background = "orange";
                    col9.style.background = "orange";
                } else if (tileImg(tileId('col1')) === 'o') {
                    alert(nextPlayer + " " + 'Win !!');
                    secondUser.win += 1;
                    firstUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col1.style.background = "orange";
                    col5.style.background = "orange";
                    col9.style.background = "orange";
                }
            }

            // //check for diagonal2
            if (tileImg(tileId('col3')) === tileImg(tileId('col5')) && tileImg(tileId('col3')) === tileImg(tileId('col7')) && (tileImg(tileId('col3')) === 'x' || tileImg(tileId('col3')) === 'o')) {
                if (tileImg(tileId('col3')) === 'x') {
                    alert(firstPlayer + " " + 'Win !!');
                    firstUser.win += 1;
                    secondUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col3.style.background = "orange";
                    col5.style.background = "orange";
                    col7.style.background = "orange";
                } else if (tileImg(tileId('col3')) === 'o') {
                    alert(nextPlayer + " " + 'Win !!');
                    secondUser.win += 1;
                    firstUser.lose += 1;
                    document.getElementById('win1').innerHTML = firstUser.win;
                    document.getElementById('lose1').innerHTML = firstUser.lose;
                    document.getElementById('win2').innerHTML = secondUser.win;
                    document.getElementById('lose2').innerHTML = secondUser.lose;
                    document.getElementById("mainTable").className = "pointerEvents";
                    col3.style.background = "orange";
                    col5.style.background = "orange";
                    col7.style.background = "orange";
                }
            } else if (checkDraw()) {
                firstUser.tie += 1;
                secondUser.tie += 1;
                document.getElementById('draw1').innerHTML = firstUser.tie;
                document.getElementById('draw2').innerHTML = secondUser.tie;
                alert('SORRY GUYS ITS A DRAW !!');
            }


        }

    };

    // //-------------------- Reset Game ------------------------------------

    function resetGame() {
        var button = document.createElement("BUTTON");
        document.getElementById("reset_div").appendChild(button);
        button.setAttribute('class', 'button2');
        button.innerHTML = 'Replay';
        document.getElementById("reset_div").addEventListener('click', function() {
            //window.location.reload()
            //document.getElementById('mainTable').innerHTML= HTML ;
            document.getElementById("mainTable").className = "";
            var t_rows = document.getElementsByClassName('t_row');
            for (var i = 0; i < t_rows.length; i++) {
                if (t_rows[i].childNodes.length !== 0) {
                    t_rows[i].removeChild(t_rows[i].childNodes[0]);
                    document.getElementById('col' + (i + 1)).style.background = 'linear-gradient(to left, #D31027 , #EA384D)'
                }

            }
        })
    };

    // RETURN FUNCTIONS ---------------------------------------------------------

    return {
        getUserInfo: getUserInfo,
        generateGameBoard: generateGameBoard,
        selectSquare: selectSquare,
        getFirstPlayer: getFirstPlayer,
        nextRound: nextRound,
        resetGame: resetGame,
        checkGameState: checkGameState,


    };

}());
