let firstScreen = document.querySelector('.first-screen');
let modal = document.querySelector('.modal-first');
let speed = 0;

modal.addEventListener('click', initGame);

function initGame(e) {
    let btn = e.target.closest('button');

    if(btn.classList.contains('easy')) {
        speed = 800;
        startGame(speed);
        firstScreen.style.display = 'none';
    }
    else if(btn.classList.contains('normal')) {
        speed = 500;
        startGame(speed);
        firstScreen.style.display = 'none';
    }
    else if(btn.classList.contains('hard')) {
        speed = 300;
        startGame(speed);
        firstScreen.style.display = 'none';
    }
};

function startGame() {
    // creating tetris field
    let tetris = document.createElement('div');
    tetris.classList.add('tetris');

    // creating and adding cells to tetris
    for(let i = 1; i < 181; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        tetris.appendChild(cell);
    }

    let main = document.querySelector('.main');
    main.appendChild(tetris);

    // adding coordinates to each cell
    let cells = document.querySelectorAll('.cell');
    let i = 0;

    for(let y = 18; y >= 1; y--) {
        for(let x = 1; x < 11; x++) {
            cells[i].setAttribute('posX', x);
            cells[i].setAttribute('posY', y);
            i++;
        }
    }

    // drawing figures

    let x = 5, y = 15;

    let mainArr = [
        // stick
        [
            [0,1],
            [0,2],
            [0,3],
            // 90 deg
            [
                [-1,1],
                [0,0],
                [1,-1],
                [2,-2]
            ],
            // 180 deg
            [
                [1,-1],
                [0,0],
                [-1,1],
                [-2,2]
            ],
            // 270
            [
                [-1,1],
                [0,0],
                [1,-1],
                [2,-2]
            ],
            // 360 deg
            [
                [1,-1],
                [0,0],
                [-1,1],
                [-2,2]
            ]
        ],
        // square
        [
            [1,0],
            [0,1],
            [1,1],
            // 90 deg
            [
                [0,0],
                [0,0],
                [0,0],
                [0,0]
            ],
            // 180 deg
            [
                [0,0],
                [0,0],
                [0,0],
                [0,0]
            ],
            // 270 deg
            [
                [0,0],
                [0,0],
                [0,0],
                [0,0]
            ],
            // 360 deg
            [
                [0,0],
                [0,0],
                [0,0],
                [0,0]
            ]
        ],
        // L (left)
        [
            [1,0],
            [2,0],
            [0,1],
            // 90 deg
            [
                [1,-1],
                [0,0],
                [-1,1],
                [2,0]
            ],
            // 180 deg
            [
                [1,0],
                [-1,0],
                [0,-1],
                [0,-1]
            ],
            // 270 deg
            [
                [-1,0],
                [2,-1],
                [1,0],
                [0,1]
            ],
            // 360
            [
                [-1,0],
                [-1,0],
                [0,-1],
                [-2,-1]
            ]
        ],
        // L (right)
        [
            [1,0],
            [2,0],
            [2,1],
            // 90 deg
            [
                [1,-1],
                [1,-1],
                [-1,0],
                [-1,0]
            ],
            // 180 deg
            [
                [-1,0],
                [-2,1],
                [0,0],
                [1,-1]
            ],
            // 270 deg
            [
                [1,0],
                [1,0],
                [-1,1],
                [-1,1]
            ],
            // 360 deg
            [
                [-1,0],
                [0,-1],
                [2,-2],
                [1,-1]
            ]
        ],
        // Z (left)
        [
            [1,0],
            [-1,1],
            [0,1],
            // 90 deg
            [
                [0,0],
                [-1,1],
                [2,0],
                [1,1]
            ],
            // 180 deg
            [
                [0,0],
                [1,-1],
                [-2,0],
                [-1,-1]
            ],
            // 270 deg
            [
                [0,0],
                [-1,1],
                [2,0],
                [1,1]
            ],
            // 360 deg
            [
                [0,0],
                [1,-1],
                [-2,0],
                [-1,-1]
            ]
        ],
        // Z (rigth)
        [
            [1,0],
            [1,1],
            [2,1],
            // 90 deg
            [
                [1,0],
                [-1,1],
                [0,0],
                [-2,1]
            ],
            // 180 deg
            [
                [-1,0],
                [1,-1],
                [0,0],
                [2,-1]
            ],
            // 270 deg
            [
                [1,0],
                [-1,1],
                [0,0],
                [-2,1]
            ],
            // 360 deg
            [
                [-1,0],
                [1,-1],
                [0,0],
                [2,-1]
            ]
        ],
        // T letter
        [
            [1,0],
            [2,0],
            [1,1],
            // 90 deg
            [
                [1,0],
                [0,1],
                [0,1],
                [0,1]
            ],
            // 180 deg
            [
                [0,0],
                [-1,0],
                [-1,0],
                [1,-1]
            ],
            // 270 deg
            [
                [0,-1],
                [0,-1],
                [0,-1],
                [-1,0]
            ],
            // 360 deg
            [
                [-1,1],
                [1,0],
                [1,0],
                [0,0]
            ]
        ]
    ];

    let currentFigure = 0;
    let figureBody = 0;
    let rotate = 1;

    function createFigures() {
        function generate() {
            return Math.round(Math.random() * (mainArr.length - 1));
        }

        rotate = 1;
        currentFigure = generate();

        figureBody = [
            document.querySelector(`[posx="${x}"][posY="${y}"]`),
            document.querySelector(`[posx="${x + mainArr[currentFigure][0][0]}"][posY="${y + mainArr[currentFigure][0][1]}"]`),
            document.querySelector(`[posx="${x + mainArr[currentFigure][1][0]}"][posY="${y + mainArr[currentFigure][1][1]}"]`),
            document.querySelector(`[posx="${x + mainArr[currentFigure][2][0]}"][posY="${y + mainArr[currentFigure][2][1]}"]`)
        ];

        for(let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    }

    createFigures();

    // make figures move

    let input = document.querySelector('.input');
    let score = 0;
    input.value = `Score: ${score}`;

    let lastScreen = document.querySelector('.last-screen');
    let gameResultText = document.querySelector('.game-result');
    let btnRestart = document.querySelector('.restart');

    function endGame(screen, text) {
        lastScreen.style.display = 'block';
        text.innerHTML = `Your score: ${score}`;
        btnRestart.addEventListener('click', function() {
            location.reload();
        });
    }


    function move() {
        let flag = true;

        let coordinates = [
            [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
            [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
            [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
            [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
        ];

        for(let i = 0; i < coordinates.length; i++) {
            if(coordinates[i][1] == 1 || document.querySelector(`[posx="${coordinates[i][0]}"][posY="${coordinates[i][1] - 1}"]`).classList.contains('set')) {
                flag = false;
                break;
            }
        }

        if(flag == true) {
            for(let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            figureBody = [
                document.querySelector(`[posx="${+coordinates[0][0]}"][posY="${+coordinates[0][1] - 1}"]`),
                document.querySelector(`[posx="${+coordinates[1][0]}"][posY="${+coordinates[1][1] - 1}"]`),
                document.querySelector(`[posx="${+coordinates[2][0]}"][posY="${+coordinates[2][1] - 1}"]`),
                document.querySelector(`[posx="${+coordinates[3][0]}"][posY="${+coordinates[3][1] - 1}"]`)
            ];

            for(let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        } else {
            for(let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
                figureBody[i].classList.add('set');
            }

            for(let i = 1; i < 15; i++) {
                let counter = 0;

                for(let j = 1; j < 11; j++) {
                    if(document.querySelector(`[posX="${j}"][posY="${i}"]`).classList.contains('set')) {
                        counter++;

                        if(counter == 10) {
                            for(let k = 1; k < 11; k++) {
                                document.querySelector(`[posX="${k}"][posY="${i}"]`).classList.remove('set');
                            }
                            
                            let set = document.querySelectorAll('.set');
                            let newSet = [];

                            score += 10;
                            input.value = `Score: ${score}`;
                        

                            for(let m = 0; m < set.length; m++) {
                                let setCoordinates = [set[m].getAttribute('posX'), set[m].getAttribute('posY')];

                                if(setCoordinates[1] > i) {
                                    set[m].classList.remove('set');
                                    newSet.push(document.querySelector(`[posX="${setCoordinates[0]}"][posY="${setCoordinates[1] - 1}"]`));
                                }
                            }

                            for(let a = 0; a < newSet.length; a++) {
                                newSet[a].classList.add('set');
                            }
                            i--;
                        }
                    }
                }
            }

            for(let k = 1; k < 11; k++) {
                if(document.querySelector(`[posX="${k}"][posY="15"]`).classList.contains('set')){
                    clearInterval(timer);
                    endGame(lastScreen, gameResultText, btnRestart);
                    // alert(`Game Over. Your Score: ${score}`);
                    break;
                }
            }


            createFigures();
        }
    }

    let timer = setInterval(() => {
        move();
    }, speed);

    let flag = true;

    window.addEventListener('keydown', function(e) {
        
        let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
        let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
        let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
        let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

        function getNewState(a) {
            flag = true;
            
            let figureNew = [
                document.querySelector(`[posx="${+coordinates1[0] + a}"][posY="${coordinates1[1]}"]`),
                document.querySelector(`[posx="${+coordinates2[0] + a}"][posY="${coordinates2[1]}"]`),
                document.querySelector(`[posx="${+coordinates3[0] + a}"][posY="${coordinates3[1]}"]`),
                document.querySelector(`[posx="${+coordinates4[0] + a}"][posY="${coordinates4[1]}"]`)
            ];

            for(let i = 0; i < figureNew.length; i++) {
                if(!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }

            if(flag) {
                for(let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }

                figureBody = figureNew;

                for(let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
            }
        }

        if(e.keyCode == 37) {
            getNewState(-1);
        }
        else if(e.keyCode == 39) {
            getNewState(1);
        }
        else if(e.keyCode == 40) {
            move();
        }
        else if(e.keyCode == 38) {
            flag = true;
            
            let figureNew = [
                document.querySelector(`[posx="${+coordinates1[0] + mainArr[currentFigure][rotate+2][0][0]}"][posY="${+coordinates1[1] + mainArr[currentFigure][rotate+2][0][1]}"]`),
                document.querySelector(`[posx="${+coordinates2[0] + mainArr[currentFigure][rotate+2][1][0]}"][posY="${+coordinates2[1] + mainArr[currentFigure][rotate+2][1][1]}"]`),
                document.querySelector(`[posx="${+coordinates3[0] + mainArr[currentFigure][rotate+2][2][0]}"][posY="${+coordinates3[1] + mainArr[currentFigure][rotate+2][2][1]}"]`),
                document.querySelector(`[posx="${+coordinates4[0] + mainArr[currentFigure][rotate+2][3][0]}"][posY="${+coordinates4[1] + mainArr[currentFigure][rotate+2][3][1]}"]`)
            ];

            for(let i = 0; i < figureNew.length; i++) {
                if(!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }

            if(flag) {
                for(let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }

                figureBody = figureNew;

                for(let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }

                if(rotate < 4) {
                    rotate++;
                }
                else {
                    rotate = 1;
                }
            }
        }
    });
}

