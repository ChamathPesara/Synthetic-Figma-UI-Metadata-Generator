const fs = require("fs");
const path = require("path");

const config = require("../config");

const { randomChoice } = require("../utils/Random");

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

// Mutators
const colorInconsistency = require("../mutators/color/colorInconsistency");
const sameColorDifferentActions = require("../mutators/color/sameColorDifferentActions");
const weakErrorVisibility = require("../mutators/color/weakErrorVisibility");

// Validator
const { validateColorDesign } = require("../validators/ColorValidator");

// Exporter
const { exportAnnotation } = require("../exporter/AnnotationExporter");

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
        name: "color_inconsistency",
        fn: colorInconsistency
    },

    {
        name: "same_color_different_actions",
        fn: sameColorDifferentActions
    },

    {
        name: "weak_error_visibility",
        fn: weakErrorVisibility
    }

];

function createDesign(index) {

    const template = randomChoice(templates);

    const mutation = randomChoice(mutations);

    const designId =
        `color_${String(index).padStart(5, "0")}`;

    const design =
        template(designId);

    randomizeTheme(design);
    randomizeContent(design);
    randomizeLayout(design);

    // Apply mutation
    const mutationResult =
        mutation.fn(design) || {};

    // Validate
    const validation =
        validateColorDesign(design);

    const valid =
        validation.colorInconsistency ||
        validation.sameColorDifferentActions ||
        validation.weakErrorVisibility;

    if (!valid) {

        return null;

    }

    return {

        design,

        annotation: {

            category: "color",

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
                validation.confidence || 1.0,

            passed: true

        }

    };

}

function generateColorDataset() {

    if (!fs.existsSync(config.COLOR_OUTPUT_DIRECTORY)) {

        fs.mkdirSync(

            config.COLOR_OUTPUT_DIRECTORY,

            {

                recursive: true

            }

        );

    }

    let generated = 0;

    while (generated < config.COLOR_DATASET_SIZE) {

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

                config.COLOR_OUTPUT_DIRECTORY,

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

                `${generated} color designs generated...`

            );

        }

    }

    console.log("");
    console.log("--------------------------------");
    console.log("Color Dataset Generation Complete");
    console.log("--------------------------------");
    console.log(`Generated : ${generated}`);
    console.log(`Output    : ${config.COLOR_OUTPUT_DIRECTORY}`);

    return {

        generated,

        output:
            config.COLOR_OUTPUT_DIRECTORY

    };

}

module.exports = generateColorDataset;