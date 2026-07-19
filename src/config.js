const path = require("path");

//-------------------------------------------------
// Root Directories
//-------------------------------------------------

const ROOT_DIRECTORY = path.join(__dirname, "..");

const OUTPUT_DIRECTORY = path.join(
    ROOT_DIRECTORY,
    "output"
);

//-------------------------------------------------
// Design Output Directories
//-------------------------------------------------

const DESIGN_OUTPUT_DIRECTORY = path.join(
    OUTPUT_DIRECTORY,
    "designs"
);

const COLOR_OUTPUT_DIRECTORY = path.join(
    DESIGN_OUTPUT_DIRECTORY,
    "color"
);

const ERROR_OUTPUT_DIRECTORY = path.join(
    DESIGN_OUTPUT_DIRECTORY,
    "error"
);

const LAYOUT_OUTPUT_DIRECTORY = path.join(
    DESIGN_OUTPUT_DIRECTORY,
    "layout"
);

const NORMAL_OUTPUT_DIRECTORY = path.join(
    DESIGN_OUTPUT_DIRECTORY,
    "normal"
);

//-------------------------------------------------
// Annotation Directories
//-------------------------------------------------

const ANNOTATION_OUTPUT_DIRECTORY = path.join(
    OUTPUT_DIRECTORY,
    "annotations"
);

// Optional category folders for annotations

const COLOR_ANNOTATION_DIRECTORY = path.join(
    ANNOTATION_OUTPUT_DIRECTORY,
    "color"
);

const ERROR_ANNOTATION_DIRECTORY = path.join(
    ANNOTATION_OUTPUT_DIRECTORY,
    "error"
);

const LAYOUT_ANNOTATION_DIRECTORY = path.join(
    ANNOTATION_OUTPUT_DIRECTORY,
    "layout"
);

const NORMAL_ANNOTATION_DIRECTORY = path.join(
    ANNOTATION_OUTPUT_DIRECTORY,
    "normal"
);

//-------------------------------------------------
// Statistics
//-------------------------------------------------

const STATISTICS_OUTPUT_DIRECTORY = path.join(
    OUTPUT_DIRECTORY,
    "statistics"
);

module.exports = {

    //-------------------------------------------------
    // Root
    //-------------------------------------------------

    ROOT_DIRECTORY,

    OUTPUT_DIRECTORY,

    //-------------------------------------------------
    // Design Directories
    //-------------------------------------------------

    DESIGN_OUTPUT_DIRECTORY,

    COLOR_OUTPUT_DIRECTORY,

    ERROR_OUTPUT_DIRECTORY,

    LAYOUT_OUTPUT_DIRECTORY,

    NORMAL_OUTPUT_DIRECTORY,

    //-------------------------------------------------
    // Annotation Directories
    //-------------------------------------------------

    ANNOTATION_OUTPUT_DIRECTORY,

    COLOR_ANNOTATION_DIRECTORY,

    ERROR_ANNOTATION_DIRECTORY,

    LAYOUT_ANNOTATION_DIRECTORY,

    NORMAL_ANNOTATION_DIRECTORY,

    //-------------------------------------------------
    // Statistics
    //-------------------------------------------------

    STATISTICS_OUTPUT_DIRECTORY,

    //-------------------------------------------------
    // Dataset Sizes
    //-------------------------------------------------

    // Change to 10000 before final generation

    COLOR_DATASET_SIZE: 1000,

    ERROR_DATASET_SIZE: 1000,

    LAYOUT_DATASET_SIZE: 1000,

    NORMAL_DATASET_SIZE: 1000,

    //-------------------------------------------------
    // Randomization
    //-------------------------------------------------

    RANDOMIZE_LAYOUT: true,

    RANDOMIZE_THEME: true,

    RANDOMIZE_CONTENT: true,

    //-------------------------------------------------
    // Mutation Probabilities
    //-------------------------------------------------

    MUTATION_PROBABILITY: {

        COLOR_INCONSISTENCY: 0.33,

        SAME_COLOR_DIFFERENT_ACTIONS: 0.33,

        WEAK_ERROR_VISIBILITY: 0.34,

        MISSING_CONFIRMATION: 0.33,

        MISSING_UNDO: 0.33,

        MISSING_EXIT: 0.34,

        ALIGNMENT: 0.25,

        BUTTON_SHAPE: 0.25,

        DENSITY: 0.25,

        SPACING: 0.25

    },

    //-------------------------------------------------
    // Validation
    //-------------------------------------------------

    VALIDATE_DATASETS: true,

    SKIP_INVALID_DESIGNS: true,

    //-------------------------------------------------
    // Export Options
    //-------------------------------------------------

    EXPORT_DESIGN_JSON: true,

    EXPORT_ANNOTATIONS: true,

    EXPORT_STATISTICS: true,

    //-------------------------------------------------
    // JSON Formatting
    //-------------------------------------------------

    JSON_INDENTATION: 4,

    //-------------------------------------------------
    // Dataset Metadata
    //-------------------------------------------------

    DATASET_VERSION: "1.0.0",

    AUTHOR: "Chamath Perera",

    DESCRIPTION:
        "Synthetic Figma UI Design Dataset for UI/UX Heuristic Issue Detection"

};