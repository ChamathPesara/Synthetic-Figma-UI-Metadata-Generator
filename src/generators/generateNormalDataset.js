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

// Validators
const {
    validateColorDesign
} = require("../validators/ColorValidator");

const {
    validateErrorDesign
} = require("../validators/ErrorValidator");

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

function createDesign(index) {

    const template = randomChoice(templates);

    const designId =
        `normal_${String(index).padStart(5, "0")}`;

    const design =
        template(designId);

    randomizeTheme(design);

    randomizeContent(design);

    randomizeLayout(design);

    //------------------------------------
    // Validate
    //------------------------------------

    const color =
        validateColorDesign(design);

    const error =
        validateErrorDesign(design);

    const layout =
        validateLayoutDesign(design);

    const hasIssue =

        color.colorInconsistency ||

        color.sameColorDifferentActions ||

        color.weakErrorVisibility ||

        error.missingExitControl ||

        error.destructiveWithoutUndo ||

        error.irreversibleWithoutConfirmation ||

        layout.spacingInconsistency ||

        layout.buttonShapeInconsistency ||

        layout.alignmentInconsistency ||

        layout.overloadedScreen;

    if (hasIssue) {

        return null;

    }

    return {

        design,

        annotation: {

            category: "normal",

            mutation: null,

            expectedLabel: "normal",

            template:

                design.template ||

                template.name,

            severity: "none",

            affectedNodes: [],

            confidence: 1.0,

            passed: true

        }

    };

}

function generateNormalDataset() {

    if (!fs.existsSync(config.NORMAL_OUTPUT_DIRECTORY)) {

        fs.mkdirSync(

            config.NORMAL_OUTPUT_DIRECTORY,

            {

                recursive: true

            }

        );

    }

    let generated = 0;

    while (generated < config.NORMAL_DATASET_SIZE) {

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

                config.NORMAL_OUTPUT_DIRECTORY,

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

                `${generated} normal designs generated...`

            );

        }

    }

    console.log("");

    console.log("--------------------------------");

    console.log("Normal Dataset Generation Complete");

    console.log("--------------------------------");

    console.log(`Generated : ${generated}`);

    console.log(`Output    : ${config.NORMAL_OUTPUT_DIRECTORY}`);

    return {

        generated,

        output: config.NORMAL_OUTPUT_DIRECTORY

    };

}

module.exports = generateNormalDataset;