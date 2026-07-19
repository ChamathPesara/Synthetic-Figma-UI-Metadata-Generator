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

// Error Mutators
const missingConfirmationMutation = require("../mutators/errorHandling/missingConfirmationMutation");
const missingUndoMutation = require("../mutators/errorHandling/missingUndoMutation");
const missingExitMutation = require("../mutators/errorHandling/missingExitMutation");

// Validator
const {
    validateErrorDesign
} = require("../validators/ErrorValidator");

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
        name: "missing_confirmation",
        fn: missingConfirmationMutation
    },

    {
        name: "missing_undo",
        fn: missingUndoMutation
    },

    {
        name: "missing_exit",
        fn: missingExitMutation
    }

];

function createDesign(index) {

    const template = randomChoice(templates);

    const mutation = randomChoice(mutations);

    const designId =
        `error_${String(index).padStart(5, "0")}`;

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
        validateErrorDesign(design);

    const valid =

        validation.missingExitControl ||

        validation.destructiveWithoutUndo ||

        validation.irreversibleWithoutConfirmation;

    if (!valid) {

        return null;

    }

    return {

        design,

        annotation: {

            category: "error",

            mutation: mutation.name,

            expectedLabel: mutation.name,

            template:

                design.template ||

                template.name,

            severity:

                mutationResult.severity ||

                "high",

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

function generateErrorDataset() {

    if (!fs.existsSync(config.ERROR_OUTPUT_DIRECTORY)) {

        fs.mkdirSync(

            config.ERROR_OUTPUT_DIRECTORY,

            {

                recursive: true

            }

        );

    }

    let generated = 0;

    while (generated < config.ERROR_DATASET_SIZE) {

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

                config.ERROR_OUTPUT_DIRECTORY,

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

                `${generated} error designs generated...`

            );

        }

    }

    console.log("");

    console.log("--------------------------------");

    console.log("Error Dataset Generation Complete");

    console.log("--------------------------------");

    console.log(`Generated : ${generated}`);

    console.log(`Output    : ${config.ERROR_OUTPUT_DIRECTORY}`);

    return {

        generated,

        output: config.ERROR_OUTPUT_DIRECTORY

    };

}

module.exports = generateErrorDataset;