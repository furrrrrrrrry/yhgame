document.addEventListener("DOMContentLoaded", function() {
    var arrayLengthInput = document.getElementById("array-length-input");
    var startButton = document.getElementById("start-button");
    var bitSelectionContainer = document.getElementById("bit-selection-container");
    var bitSelectionMessage = document.getElementById("bit-selection-message");
    var gameBoard = document.getElementById("game-board");
    var turnIndicator = document.getElementById("turn-indicator");

    var player1Array = [];
    var player2Array = [];
    var currentPlayer;
    var gameStarted = false;
    var bitSelected = false;

    startButton.addEventListener("click", function() {
        var arrayLength = parseInt(arrayLengthInput.value);
        if (isNaN(arrayLength) || arrayLength <= 1) {
            alert("请输入大于1的数字作为数组长度！");
            return;
        }

        player1Array = new Array(arrayLength).fill(0);
        player2Array = new Array(arrayLength).fill(0);
        currentPlayer = Math.random() < 0.5 ? "player1" : "player2";
        gameStarted = true;

        renderGameBoard();
        renderTurnIndicator();

        if (!bitSelected) {
            showBitSelection();
        } else {
            hideBitSelection();
            if (currentPlayer === "player1") {
                promptPlayer1();
            } else {
                promptPlayer2();
            }
        }
    });

    gameBoard.addEventListener("click", function(e) {
        if (!gameStarted) {
            return;
        }

        var index = parseInt(e.target.dataset.index);
        if (isNaN(index) || index < 0 || index >= player1Array.length) {
            return;
        }

        if (!bitSelected) {
            if (currentPlayer === "player1" && player1Array[index] === 0 && player2Array[index] === 0) {
                player1Array[index] = 1;
                bitSelected = true;
                currentPlayer = "player2";
                hideBitSelection();
                promptPlayer2();
            }
        } else {
            if (currentPlayer === "player1" && player1Array[index] === 0 && player2Array[index] === 0) {
                player1Array[index] = 1;
                currentPlayer = "player2";
            } else if (currentPlayer === "player2" && player1Array[index] === 0 && player2Array[index] === 0) {
                player2Array[index] = 1;
                currentPlayer = "player1";
            }
        }

        renderGameBoard();
        renderTurnIndicator();

        checkGameEnd();
    });

    function renderGameBoard() {
        gameBoard.innerHTML = "";

        var player1ArrayHtml = "<div>玩家1：";
        var player2ArrayHtml = "<div>玩家2：";

        for (var i = 0; i < player1Array.length; i++) {
            player1ArrayHtml += player1Array[i];
            player2ArrayHtml += player2Array[i];
        }

        player1ArrayHtml += "</div>";
        player2ArrayHtml += "</div>";

        gameBoard.innerHTML = player1ArrayHtml + player2ArrayHtml;
    }

    function renderTurnIndicator() {
        turnIndicator.textContent = "现在是 " + (currentPlayer === "player1" ? "玩家1" : "玩家2") + " 的回合";
    }

    function showBitSelection() {
        bitSelectionContainer.style.display = "block";
    }

    function hideBitSelection() {
        bitSelectionContainer.style.display = "none";
    }

    function promptPlayer1() {
        turnIndicator.textContent = "现在是 玩家1 的回合，请选择位进行操作。";
    }

    function promptPlayer2() {
        turnIndicator.textContent = "现在是 玩家2 的回合，请选择位进行操作。";
    }

    function checkGameEnd() {
        if (player1Array.every(function(bit) { return bit === 1; })) {
            endGame("player1");
        } else if (player2Array.every(function(bit) { return bit === 1; })) {
            endGame("player2");
        }
    }

    function endGame(winner) {
        gameStarted = false;
        turnIndicator.textContent = "游戏结束，" + winner + "胜利！";
    }
});
