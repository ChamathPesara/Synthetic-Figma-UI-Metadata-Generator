/*
|--------------------------------------------------------------------------
| Primary Colors
|--------------------------------------------------------------------------
*/

const PRIMARY_BLUE = {
    r: 0,
    g: 122,
    b: 255
};

const PRIMARY_GREEN = {
    r: 52,
    g: 199,
    b: 89
};

const PRIMARY_PURPLE = {
    r: 108,
    g: 92,
    b: 231
};

const PRIMARY_ORANGE = {
    r: 255,
    g: 149,
    b: 0
};

const PRIMARY_RED = {
    r: 220,
    g: 38,
    b: 38
};

/*
|--------------------------------------------------------------------------
| Semantic Colors
|--------------------------------------------------------------------------
*/

const SUCCESS_GREEN = {
    r: 52,
    g: 199,
    b: 89
};

const ERROR_RED = {
    r: 220,
    g: 38,
    b: 38
};

const WARNING_ORANGE = {
    r: 255,
    g: 149,
    b: 0
};

const INFO_BLUE = {
    r: 0,
    g: 122,
    b: 255
};

/*
|--------------------------------------------------------------------------
| Neutral Colors
|--------------------------------------------------------------------------
*/

const WHITE = {
    r: 255,
    g: 255,
    b: 255
};

const BLACK = {
    r: 0,
    g: 0,
    b: 0
};

const LIGHT_GRAY = {
    r: 245,
    g: 245,
    b: 245
};

const GRAY = {
    r: 180,
    g: 180,
    b: 180
};

const DARK_GRAY = {
    r: 90,
    g: 90,
    b: 90
};

const BORDER_GRAY = {
    r: 220,
    g: 220,
    b: 220
};

/*
|--------------------------------------------------------------------------
| Dark Theme
|--------------------------------------------------------------------------
*/

const DARK_BACKGROUND = {
    r: 20,
    g: 20,
    b: 20
};

const DARK_SURFACE = {
    r: 40,
    g: 40,
    b: 40
};

const LIGHT_TEXT = {
    r: 245,
    g: 245,
    b: 245
};

const SECONDARY_TEXT = {
    r: 130,
    g: 130,
    b: 130
};

/*
|--------------------------------------------------------------------------
| Utility
|--------------------------------------------------------------------------
*/

function cloneColor(color) {

    return {

        r: color.r,
        g: color.g,
        b: color.b

    };

}

module.exports = {

    // Primary
    PRIMARY_BLUE,
    PRIMARY_GREEN,
    PRIMARY_PURPLE,
    PRIMARY_ORANGE,
    PRIMARY_RED,

    // Semantic
    SUCCESS_GREEN,
    ERROR_RED,
    WARNING_ORANGE,
    INFO_BLUE,

    // Neutral
    WHITE,
    BLACK,
    LIGHT_GRAY,
    GRAY,
    DARK_GRAY,
    BORDER_GRAY,

    // Dark Theme
    DARK_BACKGROUND,
    DARK_SURFACE,
    LIGHT_TEXT,
    SECONDARY_TEXT,

    // Helper
    cloneColor

};