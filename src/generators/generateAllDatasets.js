const generateNormalDataset = require("./generateNormalDataset");
const generateColorDataset = require("./generateColorDataset");
const generateErrorDataset = require("./generateErrorDataset");
const generateLayoutDataset = require("./generateLayoutDataset");

const { exportStatistics } = require("../exporter/StatisticsExporter");

const config = require("../config");

function generateAllDatasets() {

    console.log("========================================");
    console.log("        UI Dataset Generator");
    console.log("========================================\n");

    const startTime = Date.now();

    //-------------------------------------------------
    // Generate Normal Dataset
    //-------------------------------------------------

    console.log("Generating Normal Dataset...");

    const normalResult = generateNormalDataset();

    console.log(
        `✓ ${normalResult.generated} normal designs generated.\n`
    );

    //-------------------------------------------------
    // Generate Color Dataset
    //-------------------------------------------------

    console.log("Generating Color Dataset...");

    const colorResult = generateColorDataset();

    console.log(
        `✓ ${colorResult.generated} color designs generated.\n`
    );

    //-------------------------------------------------
    // Generate Error Dataset
    //-------------------------------------------------

    console.log("Generating Error Dataset...");

    const errorResult = generateErrorDataset();

    console.log(
        `✓ ${errorResult.generated} error designs generated.\n`
    );

    //-------------------------------------------------
    // Generate Layout Dataset
    //-------------------------------------------------

    console.log("Generating Layout Dataset...");

    const layoutResult = generateLayoutDataset();

    console.log(
        `✓ ${layoutResult.generated} layout designs generated.\n`
    );

    //-------------------------------------------------
    // Summary
    //-------------------------------------------------

    const totalDesigns =

        normalResult.generated +

        colorResult.generated +

        errorResult.generated +

        layoutResult.generated;

    const elapsedSeconds = Number(

        ((Date.now() - startTime) / 1000)

        .toFixed(2)

    );

    //-------------------------------------------------
    // Export Statistics
    //-------------------------------------------------

    if (config.EXPORT_STATISTICS) {

        exportStatistics({

            normal: normalResult,

            color: colorResult,

            error: errorResult,

            layout: layoutResult,

            total: totalDesigns,

            elapsedTime: elapsedSeconds

        });

    }

    //-------------------------------------------------
    // Console Summary
    //-------------------------------------------------

    console.log("");
    console.log("========================================");
    console.log(" Dataset Generation Completed");
    console.log("========================================");

    console.log(`Normal Dataset : ${normalResult.generated}`);
    console.log(`Color Dataset  : ${colorResult.generated}`);
    console.log(`Error Dataset  : ${errorResult.generated}`);
    console.log(`Layout Dataset : ${layoutResult.generated}`);

    console.log("----------------------------------------");

    console.log(`Total Designs  : ${totalDesigns}`);
    console.log(`Elapsed Time   : ${elapsedSeconds} seconds`);

    console.log("========================================");

    //-------------------------------------------------
    // Return summary
    //-------------------------------------------------

    return {

        normal: normalResult,

        color: colorResult,

        error: errorResult,

        layout: layoutResult,

        total: totalDesigns,

        elapsedTime: elapsedSeconds

    };

}

module.exports = generateAllDatasets;

// Execute directly
if (require.main === module) {

    generateAllDatasets();

}