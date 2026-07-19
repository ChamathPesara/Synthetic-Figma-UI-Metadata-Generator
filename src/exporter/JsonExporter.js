const fs = require("fs");
const path = require("path");

const config = require("../config");

/**
 * Creates a directory if it does not already exist.
 */
function ensureDirectory(directory) {

    if (!fs.existsSync(directory)) {

        fs.mkdirSync(directory, {

            recursive: true

        });

    }

}

/**
 * Returns the correct output directory
 * based on the dataset category.
 */
function getOutputDirectory(category) {

    switch (category) {

        case "color":

            return config.COLOR_OUTPUT_DIRECTORY;

        case "layout":

            return config.LAYOUT_OUTPUT_DIRECTORY;

        case "error":

            return config.ERROR_OUTPUT_DIRECTORY;

        default:

            throw new Error(

                `Unknown dataset category: ${category}`

            );

    }

}

/**
 * Builds the complete export path.
 */
function getExportPath(design) {

    const directory = getOutputDirectory(

        design.metadata.category

    );

    ensureDirectory(directory);

    return path.join(

        directory,

        `${design.designId}.json`

    );

}

/**
 * Exports a design JSON file.
 */
function exportDesign(design) {

    const exportPath = getExportPath(design);

    fs.writeFileSync(

        exportPath,

        JSON.stringify(

            design,

            null,

            4

        )

    );

    return exportPath;

}

/**
 * Reads a previously exported design.
 */
function importDesign(filePath) {

    return JSON.parse(

        fs.readFileSync(

            filePath,

            "utf8"

        )

    );

}

/**
 * Deletes an exported design.
 */
function deleteDesign(filePath) {

    if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

    }

}

/**
 * Checks whether a design
 * already exists.
 */
function designExists(design) {

    return fs.existsSync(

        getExportPath(design)

    );

}

module.exports = {

    exportDesign,

    importDesign,

    deleteDesign,

    designExists,

    getExportPath

};