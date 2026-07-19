const counters = {};

function generateId(prefix = "node") {

    if (!counters[prefix]) {

        counters[prefix] = 1;

    }

    return `${prefix}_${counters[prefix]++}`;

}

function resetIds() {

    Object.keys(counters).forEach(key => {

        delete counters[key];

    });

}

function getCurrentCount(prefix) {

    return counters[prefix] || 0;

}

module.exports = {

    generateId,

    resetIds,

    getCurrentCount

};