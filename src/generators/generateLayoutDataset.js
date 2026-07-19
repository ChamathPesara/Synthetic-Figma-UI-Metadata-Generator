const fs = require("fs");
const path = require("path");

const config = require("../config");

const {
    randomChoice
} = require("../utils/Random");

// Templates
const LoginTemplate = require("../templates/authentication/LoginTemplate");
const RegisterTemplate = require("../templates/authentication/RegisterTemplate");
const ContactFormTemplate = require("../templates/forms/ContactFormTemplate");
const DashboardTemplate = require("../templates/dashboard/DashboardTemplate");
const SettingsTemplate = require("../templates/forms/SettingsTemplate");
const DeleteConfirmationTemplate = require("../templates/dialogs/DeleteConfirmationTemplate");
const ResetConfirmationTemplate = require("../templates/dialogs/ResetConfirmationTemplate");

// Randomizers
const randomizeTheme = require("../randomizers/ThemeRandomizer");
const randomizeContent = require("../randomizers/ContentRandomizer");
const randomizeLayout = require("../randomizers/LayoutRandomizer");

// Layout Mutators
const alignmentMutation = require("../mutators/layout/alignmentMutation");
const spacingMutation = require("../mutators/layout/spacingMutation");
const buttonShapeMutation = require("../mutators/layout/buttonShapeMutation");
const densityMutation = require("../mutators/layout/densityMutation");

// Validator
const {
    validateLayoutDesign
} = require("../validators/LayoutValidator");

// Annotation Exporter
const {
    exportAnnotation
} = require("../exporter/AnnotationExporter");

const templates = [

    LoginTemplate,
    RegisterTemplate,
    ContactFormTemplate,
    DashboardTemplate,
    SettingsTemplate,
    DeleteConfirmationTemplate,
    ResetConfirmationTemplate

];

const mutations = [

    {
        name: "alignment_inconsistency",
        fn: alignmentMutation
    },

    {
        name: "spacing_inconsistency",
        fn: spacingMutation
    },

    {
        name: "button_shape_inconsistency",
        fn: buttonShapeMutation
    },

    {
        name: "overloaded_screen",
        fn: densityMutation
    }

];

function createDesign(index) {

    const template = randomChoice(templates);

    const mutation = randomChoice(mutations);

    const designId =
        `layout_${String(index).padStart(5, "0")}`;

    const design =
        template(designId);

    // -----------------------------
    // Randomization
    // -----------------------------

    randomizeTheme(design);

    randomizeContent(design);

    randomizeLayout(design);

    // -----------------------------
    // Apply mutation
    // -----------------------------

    const mutationResult =
        mutation.fn(design) || {};

    // -----------------------------
    // Validate
    // -----------------------------

    const validation =
        validateLayoutDesign(design);

    const valid =

        validation.modalWithoutExit ||

        validation.spacingInconsistency ||

        validation.buttonShapeInconsistency ||

        validation.alignmentInconsistency ||

        validation.overloadedScreen;

    if (!valid) {

        return null;

    }

    return {

        design,

        annotation: {

            category: "layout",

            mutation: mutation.name,

            expectedLabel: mutation.name,

            template:

                design.template ||

                template.name,

            severity:

                mutationResult.severity ||

                "medium",

            affectedNodes:

                mutationResult.affectedNodes ||

                [],

            confidence:

                validation.confidence ||

                1.0,

            passed: true

        }

    };

}

function generateLayoutDataset() {

    if (!fs.existsSync(config.LAYOUT_OUTPUT_DIRECTORY)) {

        fs.mkdirSync(

            config.LAYOUT_OUTPUT_DIRECTORY,

            {

                recursive: true

            }

        );

    }

    let generated = 0;

    while (generated < config.LAYOUT_DATASET_SIZE) {

        const result =
            createDesign(generated + 1);

        if (!result) {

            continue;

        }

        const {

            design,
            annotation

        } = result;

        fs.writeFileSync(

            path.join(

                config.LAYOUT_OUTPUT_DIRECTORY,

                `${design.designId}.json`

            ),

            JSON.stringify(

                design,

                null,

                4

            )

        );

        exportAnnotation(

            design,

            annotation

        );

        generated++;

        if (generated % 100 === 0) {

            console.log(

                `${generated} layout designs generated...`

            );

        }

    }

    console.log("");

    console.log("--------------------------------");

    console.log("Layout Dataset Generation Complete");

    console.log("--------------------------------");

    console.log(`Generated : ${generated}`);

    console.log(`Output    : ${config.LAYOUT_OUTPUT_DIRECTORY}`);

    return {

        generated,

        output: config.LAYOUT_OUTPUT_DIRECTORY

    };

}

module.exports = generateLayoutDataset;