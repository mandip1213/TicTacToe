let turn = ""
let initial_chosen = ""
let alldiv = Array.from(document.querySelectorAll(".playing-block"))
winningcombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
var counter = 0;
var no_of_game = 0;
var check_no_of_game = 1;
var player1 = ""
var player2 = ""



function areequal(arr1, arr2) {
    return (arr1.length == arr2.length) && arr1.every(function(element, index) {
        return element === arr2[index];
    })
}
//event listener for entering name
document.getElementById("start-button").addEventListener("click", (event) => {
    username = document.getElementById("username").value
    if (username.length != 0) {
        document.getElementsByClassName("welcome-screen")[0].style.display = "none"
        document.getElementsByClassName("welcome-screen-2")[0].style.display = "flex"
    } else {
        alert("Username can't be empty.")
    }
    document.getElementById("welcome-screen-2-username").innerText = username
    document.getElementById("circle-cross-username").innerText = username
})

//event listener for playing  type
document.getElementById("play-with-computer").addEventListener("click", play_with_computer)
document.getElementById("two-player").addEventListener("click", two_player)

function two_player() {
    document.getElementsByClassName("display-winner")[0].style.display = "none" //for restarting game
    for (item of alldiv) {
        item.innerHTML = ""
    }
    document.getElementsByClassName("welcome-screen-2")[0].style.display = "none"
    document.getElementsByClassName("circle-cross")[0].style.display = "flex"

    //select play as cross or circle
    for (item of document.getElementsByClassName("play-circle-cross")) {
        item.addEventListener("click", (event) => {

            document.getElementsByClassName("two-player-circle-cross")[0].style.display = "flex"
            document.getElementsByClassName("circle-cross")[0].style.display = "none"
            if (event.target.getAttribute("playas") == "play-as-circle") {
                player1 = "circle"
                player2 = "cross"
                turn = "circle"
                document.getElementsByClassName("player-1")[0].innerHTML = `<span id="player-1">${username}: </span><div class="circle"></div>`
                document.getElementsByClassName("player-2")[0].innerHTML = `<span id="player-2">player2: 
                </span> <div class="cross"><span class="material-icons">clear</span></div>`
                document.getElementById("your-turn").innerHTML = `${username}<div class="circle"></div>`
                document.getElementById("player-2-turn").innerHTML = `Player2 <div class="cross"><span class="material-icons">clear</span></div>`
            } else {
                player1 = "cross"
                player2 = "cross"
                turn = "cross"
                document.getElementsByClassName("player-1")[0].innerHTML = `<span id="player-1">${username}: </span><div class="cross"><span class="material-icons">clear</span></div>`
                document.getElementsByClassName("player-2")[0].innerHTML = `<span id="player-2">player2: 
                </span><div class="circle"></div>`
                document.getElementById("player-2-turn").innerHTML = `Player2<div class="circle"></div>`
                document.getElementById("your-turn").innerHTML = `${username}<div class="cross"><span class="material-icons">clear</span></div>`

            }
        })
    }

}

function two_player_playing() {
    document.getElementsByClassName("playing-board-container")[0].style.display = "flex"
    document.getElementsByClassName("two-player-circle-cross")[0].style.display = "none"
    document.getElementById("computer-turn").style.display = "none"
    document.getElementById("restart-button").style.display = "none"
    document.getElementById("player-2-turn").style.display = "flex"
    document.getElementById("restart-two-player-button").style.display = "block"
    document.addEventListener("click", (events) => {
        if (events.target.className == "playing-block") {
            if (events.target.innerHTML.length == 0) {
                console.log("event tageted")

                if (turn == "circle") {
                    events.target.innerHTML = `<div class="circle"></div>`



                } else {
                    events.target.innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`


                }


                checkwin()
                turn = (turn == "circle" ? "cross" : "circle")
                changeturn()

            }


        }
    })
}

function checkwin() {
    console.log("checking who wins")
    if (winningcombinations.some(combination => {
            return combination.every(combination_index => {
                if (turn == "circle") { html = `<div class="circle"></div>` } else { html = `<div class="cross"><span class="material-icons">clear</span></div>` }

                return (alldiv[combination_index].innerHTML == html)

            })
        })) {

        showwinner()
            // console.log("game completeeee")
    } else { return false }

}

function showwinner() {
    document.getElementsByClassName("display-winner")[0].style.display = "flex"
    document.getElementsByClassName("playing-board-container")[0].style.display = "none"


    if (turn == initial_chosen || turn == player1) {
        greetings = `Congratulations  `
        message = `you won !!!`
        bgcolor = "rgb(84, 227, 177)"
    } else {
        greetings = `Sorry  `
        message = `You lose`
        bgcolor = "rgb(245, 121, 113)"
    }
    console.log(username)
    document.getElementById("greetings").innerText = greetings
    document.getElementById("congrats_sorry_user").innerText = username
    document.getElementById("message").innerText = message
    document.getElementsByClassName("display-winner")[0].style.backgroundColor = bgcolor

}

//the work of this isnot visisble since the program runs very fast
function changeturn() {
    if (turn == player1) {
        document.getElementById("your-turn").style.backgroundColor = "rgb(168, 116, 216)"
        document.getElementById("your-turn").style.color = "white"
        document.getElementById("player-2-turn").style.backgroundColor = "white"
        document.getElementById("player-2-turn").style.color = "rgb(168, 116, 216)"
    } else {
        document.getElementById("player-2-turn").style.backgroundColor = "rgb(168, 116, 216)"
        document.getElementById("player-2-turn").style.color = "white"
        document.getElementById("your-turn").style.backgroundColor = "white"
        document.getElementById("your-turn").style.color = "rgb(168, 116, 216)"
    }
}




function play_with_computer() {
    document.getElementsByClassName("welcome-screen-2")[0].style.display = "none"
    document.getElementsByClassName("circle-cross")[0].style.display = "flex"

    //select play as cross or circle
    for (item of document.getElementsByClassName("play-circle-cross")) {
        item.addEventListener("click", (event) => {
            if (event.target.getAttribute("playas") == "play-as-circle") {
                console.log("playing as circle")
                initial_chosen = "circle"
                turn = "circle"
                document.getElementsByClassName("playing-board-container")[0].style.display = "flex"
                document.getElementsByClassName("circle-cross")[0].style.display = "none"
                document.getElementById("your-turn").innerHTML = `${username}<div class="circle"></div>`
                document.getElementById("computer-turn").innerHTML = `Computer <div class="cross"><span class="material-icons">clear</span></div>`
                playing_computer_2()
            } else {
                console.log("playing as cross")

                initial_chosen = "cross"
                turn = "cross"
                document.getElementsByClassName("playing-board-container")[0].style.display = "flex"
                document.getElementsByClassName("circle-cross")[0].style.display = "none"
                document.getElementById("your-turn").innerHTML = `${username}<div class="cross"><span class="material-icons">clear</span></div>`
                document.getElementById("computer-turn").innerHTML = `Computer <div class="circle"></div>`
                playing_computer_2()

            }
        })
    }
}

function restartgame() {
    for (item of alldiv) {
        item.innerHTML = ""
    }

    document.getElementsByClassName("display-winner")[0].style.display = "none"
    play_with_computer()

}





function playing_computer_2() {
    document.getElementById("computer-turn").style.display = "flex" //if player comes to play with computer after playing double player
    document.getElementById("player-2-turn").style.display = "none" // "                "                    "                       "

    counter = 0
    document.addEventListener("click", (events) => {
        if (events.target.className == "playing-block") {

            if (events.target.innerHTML.length == 0) {

                if (turn == initial_chosen) {

                    if (initial_chosen == "circle") {
                        events.target.innerHTML = `<div class="circle"></div>`
                        counter += 1
                    } else {
                        events.target.innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
                        counter += 1

                    }

                }
                // console.log("counter check 2", counter)
                // counter += 1
                // console.log("counter check 3", counter)

                checkwin()
                turn = (turn == "circle" ? "cross" : "circle")


            }
            if (counter === 1) {
                step2(events.target.id.slice(-1))
                checkwin()
                counter += 1
                turn = (turn == "circle" ? "cross" : "circle")

            } else if (counter === 3) {
                step4()
                checkwin()
                counter += 1
                turn = (turn == "circle" ? "cross" : "circle")

            } else if (counter === 5) {
                step6()
                checkwin()
                counter += 1
                turn = (turn == "circle" ? "cross" : "circle")

                console.log("///")
            } else if (counter === 7) {
                step8()
                checkwin()
                counter += 1
                turn = (turn == "circle" ? "cross" : "circle")

            } else if (counter === 9) {
                step9()
            }

            console.log("counter check 4", counter)

        }


    })
}

function step9() {
    if (checkwin() == false) {
        document.getElementById("greetings").innerText = "OOps!!!  "
        document.getElementById("congrats_sorry_user").innerText = username
        document.getElementById("message").innerText = "The Game is drawn"
        document.getElementsByClassName("display-winner")[0].style.backgroundColor = "orange"
        document.getElementsByClassName("display-winner")[0].style.display = "flex"
        document.getElementsByClassName("playing-board-container")[0].style.display = "none"

    }
}

function step2(block) {
    console.log("comp is playing step 2  ", block)
    if (["0", "2", "6", "8"].includes(block)) {
        if (turn == "circle") {
            document.getElementById("block-4").innerHTML = `<div class="circle"></div>`
        } else {
            document.getElementById("block-4").innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
        }
    } else if (["1", "3", "5", "7"].includes(block)) {
        playnextblock = {
            1: ["0", "2"],
            3: ["0", "6"],
            5: ["2", "8"],
            7: ["6", "8"]
        }
        for ([key, value] of Object.entries(playnextblock)) {
            if (block == key) {
                changediv = "block-" + value[Math.floor(Math.random() * 2)]
                if (turn == "circle") {
                    document.getElementById(changediv).innerHTML = `<div class="circle"></div>`
                } else {
                    document.getElementById(changediv).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
                }
            }
        }
    } else {
        changediv = "block-" + ["0", "2", "6", "8"][Math.floor(Math.random() * 4)]
        if (turn == "circle") {
            document.getElementById(changediv).innerHTML = `<div class="circle"></div>`
        } else {
            document.getElementById(changediv).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
        }
    }

}

function step4() {
    console.log("comp is playing step 4  ")

    if (initial_chosen == "circle") { html2 = `<div class="circle"></div>` } else { html2 = `<div class="cross"><span class="material-icons">clear</span></div>` }
    // try to stop winning combinations
    for (let winningcombination of winningcombinations) {
        let counter2 = 0;
        for (let blockindex of winningcombination) {
            if (alldiv[blockindex].innerHTML == html2) {
                counter2 += 1
            } else { blocktoplay = "block-" + blockindex }
        }
        if (counter2 == 2) {
            if (document.getElementById(blocktoplay).innerHTML.length == 0) {
                if (turn == "circle") {

                    document.getElementById(blocktoplay).innerHTML = `<div class="circle"></div>`

                } else {
                    document.getElementById(blocktoplay).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`

                }
                return;
            }
        }

    }

    // knock knock now make your winning combination bloody computer
    for (let winningcombination of winningcombinations) {
        let counter3 = 0;
        for (let blockindex of winningcombination) {
            if (alldiv[blockindex].innerHTML.length != 0) {
                counter3 += 1
            }
        }
        if (counter3 == 3) {
            if (areequal(winningcombination, [2, 4, 6]) || areequal(winningcombination, [0, 4, 8])) {
                // console.log("test")
                if (alldiv[winningcombination[0]].innerHTML == alldiv.slice(-1)[0].innerHTML) {
                    blocktoplay4 = ["1", "3", "5", "7"]
                    blocktoplay4 = "block-" + blocktoplay4[Math.floor(Math.random() * 4)]
                    if (turn == "circle") {
                        document.getElementById(blocktoplay4).innerHTML = `<div class="circle"></div>`

                    } else {
                        document.getElementById(blocktoplay4).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
                    }

                } else {
                    blocktoplay5 = (areequal(winningcombination, [0, 4, 8]) ? [2, 6] : [0, 8])
                    blocktoplay5 = "block-" + blocktoplay5[Math.floor(Math.random() * 2)]
                    if (turn == "circle") {
                        document.getElementById(blocktoplay5).innerHTML = `<div class="circle"></div>`

                    } else {
                        document.getElementById(blocktoplay5).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
                    }
                }

            } else {
                if (areequal(winningcombination, [0, 1, 2])) { blocktoplay6 = [6, 8] } else if (areequal(winningcombination, [6, 7, 8])) { blocktoplay6 = [0, 2] } else if (areequal(winningcombination, [0, 3, 6])) { blocktoplay6 = [2, 8] } else { blocktoplay6 = [0, 6] }
                blocktoplay6 = "block-" + blocktoplay6[Math.floor(Math.random() * 2)]
                if (turn == "circle") {
                    document.getElementById(blocktoplay6).innerHTML = `<div class="circle"></div>`

                } else {
                    document.getElementById(blocktoplay6).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
                }


            }

            return
        }
    }
    if (document.getElementById("block-4").innerHTML == 0) {
        if (turn == "circle") {
            document.getElementById("block-4").innerHTML = `<div class="circle"></div>`
        } else {
            document.getElementById("block-4").innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
        }
        return;
    }

    for (item of[0, 2, 6, 8]) {
        // console.log("hi")
        blocktoplay7 = [0, 2, 6, 8][Math.floor(Math.random() * 4)]
        if (alldiv[blocktoplay7].innerHTML == 0) {
            blocktoplay7 = "block-" + blocktoplay7

            if (turn == "circle") {
                document.getElementById(blocktoplay7).innerHTML = `<div class="circle"></div>`
                return
            } else {
                document.getElementById(blocktoplay7).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`

                return
            }
        }
    }
}

function step6() {
    console.log("comp is playing step  6")

    // try to win if possible
    if (initial_chosen == "cross") { html3 = `<div class="circle"></div>` } else { html3 = `<div class="cross"><span class="material-icons">clear</span></div>` }
    for (let winningcombination of winningcombinations) {
        let counter5 = 0;
        for (blockindex of winningcombination) {
            if (alldiv[blockindex].innerHTML == html3) {
                counter5 += 1
                    // console.log(blockindex, "  ", winningcombination)
                    // console.log(counter5, " coun ter 5")
            } else { blocktoplay = "block-" + blockindex }
        }
        // console.log(counter5, " counter 5")

        if (counter5 == 2) {
            console.log(blocktoplay)
            if (document.getElementById(blocktoplay).innerHTML.length == 0) {
                if (turn == "circle") {
                    console.log("hello")
                    document.getElementById(blocktoplay).innerHTML = `<div class="circle"></div>`


                } else {
                    document.getElementById(blocktoplay).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`


                }
                return;
            }
        }

    }
    // trying to stop from winning
    if (initial_chosen == "circle") { html2 = `<div class="circle"></div>` } else { html2 = `<div class="cross"><span class="material-icons">clear</span></div>` }
    // try to stop winning combinations
    for (let winningcombination of winningcombinations) {
        let counter6 = 0;
        for (let blockindex of winningcombination) {
            if (alldiv[blockindex].innerHTML == html2) {
                counter6 += 1
            } else { blocktoplay = "block-" + blockindex }
        }
        if (counter6 == 2) {
            if (document.getElementById(blocktoplay).innerHTML.length == 0) {
                console.log(document.getElementById(blocktoplay).innerHTML)
                if (turn == "circle") {
                    document.getElementById(blocktoplay).innerHTML = `<div class="circle"></div>`

                } else {
                    document.getElementById(blocktoplay).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`


                }
                return;
            }
        }

    }
    for (item of[0, 2, 6, 8]) {
        console.log("hi")
        blocktoplay7 = [0, 2, 6, 8][Math.floor(Math.random() * 4)]
        if (alldiv[blocktoplay7].innerHTML == 0) {
            blocktoplay7 = "block-" + blocktoplay7

            if (turn == "circle") {
                document.getElementById(blocktoplay7).innerHTML = `<div class="circle"></div>`
                return
            } else {
                document.getElementById(blocktoplay7).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
                return
            }
        }
    }

    for (item of alldiv) {
        if (item.innerHTML.length == 0) {
            if (turn == "circle") {
                item.innerHTML = `<div class="circle"></div>`
                return
            } else {
                item.innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
                return
            }

        }
    }


}

function step8() {
    console.log("comp is playing step  8")

    // try to stwin if possible
    if (initial_chosen == "cross") { html3 = `<div class="circle"></div>` } else { html3 = `<div class="cross"><span class="material-icons">clear</span></div>` }
    for (let winningcombination of winningcombinations) {
        let counter7 = 0;
        for (let blockindex of winningcombination) {
            if (alldiv[blockindex].innerHTML == html3) {
                counter7 += 1
            } else { blocktoplay = "block-" + blockindex }
        }
        if (counter7 == 2) {
            if (document.getElementById(blocktoplay).innerHTML.length == 0) {
                console.log(document.getElementById(blocktoplay).innerHTML)
                if (turn == "circle") {

                    document.getElementById(blocktoplay).innerHTML = `<div class="circle"></div>`


                } else {
                    document.getElementById(blocktoplay).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`


                }
                return;
            }
        }

    }
    // trying to stop from winning
    if (initial_chosen == "circle") { html2 = `<div class="circle"></div>` } else { html2 = `<div class="cross"><span class="material-icons">clear</span></div>` }
    // try to stop winning combinations
    for (let winningcombination of winningcombinations) {
        let counter2 = 0;
        for (let blockindex of winningcombination) {
            if (alldiv[blockindex].innerHTML == html2) {
                counter2 += 1
            } else { blocktoplay = "block-" + blockindex }
        }
        if (counter2 == 2) {
            if (document.getElementById(blocktoplay).innerHTML.length == 0) {
                console.log(document.getElementById(blocktoplay).innerHTML)
                if (turn == "circle") {
                    document.getElementById(blocktoplay).innerHTML = `<div class="circle"></div>`


                } else {
                    document.getElementById(blocktoplay).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`

                }
                return;
            }
        }

    }
    for (item of[0, 2, 6, 8]) {
        blocktoplay8 = [0, 2, 6, 8][Math.floor(Math.random() * 4)]
        if (alldiv[blocktoplay8].innerHTML.length == 0) {
            // console.log("block", blocktoplay8, "empty")
            blocktoplay8 = "block-" + blocktoplay8

            if (turn == "circle") {
                document.getElementById(blocktoplay8).innerHTML = `<div class="circle"></div>`

                return
            } else {
                document.getElementById(blocktoplay7).innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
                return
            }
        }
    }

    for (item of alldiv) {
        if (item.innerHTML.length == 0) {
            if (turn == "circle") {
                item.innerHTML = `<div class="circle"></div>`
                return
            } else {
                item.innerHTML = `<div class="cross"><span class="material-icons">clear</span></div>`
                return
            }

        }
    }
}