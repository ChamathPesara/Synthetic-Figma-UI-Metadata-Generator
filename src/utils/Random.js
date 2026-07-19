function randomInt(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

function randomFloat(min, max) {

    return Math.random() * (max - min) + min;

}

function randomChoice(array) {

    return array[
        randomInt(0, array.length - 1)
    ];

}

function randomBoolean(probability = 0.5) {

    return Math.random() < probability;

}

/* ------------------------------------ */
/* NEW */
/* ------------------------------------ */

function randomRange(min, max) {

    return randomInt(min, max);

}

function randomSign() {

    return Math.random() < 0.5 ? -1 : 1;

}

function randomOffset(maxOffset) {

    return randomSign() * randomInt(0, maxOffset);

}

function randomColorVariation(value, amount = 25) {

    return Math.max(
        0,
        Math.min(
            255,
            value + randomOffset(amount)
        )
    );

}

function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const j = randomInt(0, i);

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }

    return copy;

}

function randomSubset(array, count) {

    return shuffle(array).slice(0, count);

}

module.exports = {

    randomInt,
    randomFloat,
    randomChoice,
    randomBoolean,

    randomRange,
    randomSign,
    randomOffset,
    randomColorVariation,
    shuffle,
    randomSubset

};