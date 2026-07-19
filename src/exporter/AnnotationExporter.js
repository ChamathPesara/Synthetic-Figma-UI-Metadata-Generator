const fs = require("fs");
const path = require("path");

const config = require("../config");

function ensureDirectory(directory) {

    if (!fs.existsSync(directory)) {

        fs.mkdirSync(directory, {
            recursive: true
        });

    }

}

function getAnnotationDirectory(category) {

    switch ((category || "").toLowerCase()) {

        case "color":
            return config.COLOR_ANNOTATION_DIRECTORY;

        case "error":
            return config.ERROR_ANNOTATION_DIRECTORY;

        case "layout":
            return config.LAYOUT_ANNOTATION_DIRECTORY;

        case "normal":
            return config.NORMAL_ANNOTATION_DIRECTORY;

        default:
            return config.ANNOTATION_OUTPUT_DIRECTORY;

    }

}

function buildAnnotation(design, validation = {}) {

    return {

        //--------------------------------------------------
        // Dataset Information
        //--------------------------------------------------

        datasetVersion: config.DATASET_VERSION,

        annotationVersion: "1.0",

        generatedAt: new Date().toISOString(),

        //--------------------------------------------------
        // Design Information
        //--------------------------------------------------

        designId: design.designId,

        screenType: design.screenType,

        template:

            validation.template ||

            design.template ||

            design.screenType,

        theme:

            design.theme ||

            null,

        //--------------------------------------------------
        // Classification
        //--------------------------------------------------

        category:

            validation.category ||

            design.category ||

            "unknown",

        mutation:

            validation.mutation ||

            "none",

        expectedLabel:

            validation.expectedLabel ||

            validation.mutation ||

            "normal",

        //--------------------------------------------------
        // Validation
        //--------------------------------------------------

        severity:

            validation.severity ||

            "low",

        affectedNodes:

            validation.affectedNodes ||

            [],

        validator: {

            passed:

                validation.passed ?? true,

            confidence:

                validation.confidence ?? 1.0

        }

    };

}

function exportAnnotation(design, validation = {}) {

    const category =

        validation.category ||

        design.category ||

        "unknown";

    const outputDirectory =

        getAnnotationDirectory(category);

    ensureDirectory(outputDirectory);

    const annotation =

        buildAnnotation(

            design,

            validation

        );

    const filename =

        `${design.designId}_annotation.json`;

    const filepath =

        path.join(

            outputDirectory,

            filename

        );

    fs.writeFileSync(

        filepath,

        JSON.stringify(

            annotation,

            null,

            config.JSON_INDENTATION

        )

    );

    return annotation;

}

module.exports = {

    exportAnnotation

};