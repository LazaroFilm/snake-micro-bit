input.onButtonPressed(Button.A, function () {
    if (snake_direction == 0) {
        snake_direction = 3
    } else {
        snake_direction += -1
    }
})
function newFood () {
    food_x = randint(0, 4)
    foox_y = randint(0, 4)
    while (led.point(food_x, foox_y)) {
        food_x = randint(0, 4)
        foox_y = randint(0, 4)
    }
    led.plot(food_x, foox_y)
    speed += -100
}
function gameOver () {
    basic.clearScreen()
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.SmallDiamond)
    basic.pause(200)
    basic.showIcon(IconNames.Diamond)
    basic.pause(200)
    basic.showIcon(IconNames.Chessboard)
    basic.pause(200)
    basic.showLeds(`
        # . # . #
        . # . # .
        # . # . #
        . # . # .
        # . # . #
        `)
    basic.pause(1500)
    reset()
}
function moveSnake () {
    if (snake_direction == 0) {
        snake_y += -1
    } else if (snake_direction == 1) {
        snake_x += 1
    } else if (snake_direction == 2) {
        snake_y += 1
    } else if (snake_direction == 3) {
        snake_x += -1
    }
    snake_x_array.unshift(snake_x)
    snake_y_array.unshift(snake_y)
    if (snake_x == food_x && snake_y == foox_y) {
        music.play(music.tonePlayable(784, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
        newFood()
        snake_length += 1
    } else {
        if (led.point(snake_x, snake_y)) {
            gameOver()
        } else {
            music.play(music.tonePlayable(494, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
            led.plot(snake_x, snake_y)
        }
    }
    if (snake_x_array.length > snake_length) {
        while (snake_x_array.length > snake_length) {
            snake_x_array.pop()
            snake_y_array.pop()
        }
    }
    if (snake_x_array.length >= snake_length) {
        led.unplot(snake_x_array.pop(), snake_y_array.pop())
    }
}
input.onButtonPressed(Button.B, function () {
    if (snake_direction == 3) {
        snake_direction = 0
    } else {
        snake_direction += 1
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    game_over = 2
})
function reset () {
    basic.clearScreen()
    basic.pause(200)
    basic.showLeds(`
        . . # # .
        . # . . .
        . . # . .
        . . . # .
        . # # . .
        `)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.UntilDone)
    music.stopMelody(MelodyStopOptions.All)
    speed = 1000
    snake_direction = 0
    snake_x = 2
    snake_y = 4
    snake_x_array = [snake_x]
    snake_y_array = [snake_y]
    snake_length = 3
    basic.pause(1000)
    basic.clearScreen()
    basic.pause(500)
    newFood()
    led.plot(snake_x, snake_y)
    music.play(music.tonePlayable(494, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
    basic.pause(speed)
    game_over = 0
}
let game_over = 0
let snake_length = 0
let snake_y_array: number[] = []
let snake_x_array: number[] = []
let snake_x = 0
let snake_y = 0
let speed = 0
let foox_y = 0
let food_x = 0
let snake_direction = 0
reset()
loops.everyInterval(speed, function () {
    if (game_over == 0) {
        if (snake_x < 0 || snake_x > 4 || (snake_y < 0 || snake_y > 4)) {
            gameOver()
        } else if (game_over == 0) {
            moveSnake()
        }
    } else if (game_over == 1) {
        gameOver()
    } else {
        reset()
    }
})
