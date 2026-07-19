const fs = require("fs");
const path = require("path");

const config = require("./config");

const generateColorDataset =
require("./generators/generateColorDataset");

const generateErrorDataset =
require("./generators/generateErrorDataset");

const generateLayoutDataset =
require("./generators/generateLayoutDataset");

function countFiles(directory){

    if(!fs.existsSync(directory))
        return 0;

    return fs.readdirSync(directory)
        .filter(file=>file.endsWith(".json"))
        .length;

}

function printStatistics(){

    console.log("");

    console.log("====================================");
    console.log(" DATASET GENERATION SUMMARY");
    console.log("====================================");

    console.log("");

    console.log(
        "Color Dataset  :",
        countFiles(config.COLOR_OUTPUT_DIRECTORY)
    );

    console.log(
        "Error Dataset  :",
        countFiles(config.ERROR_OUTPUT_DIRECTORY)
    );

    console.log(
        "Layout Dataset :",
        countFiles(config.LAYOUT_OUTPUT_DIRECTORY)
    );

    console.log("");

    const total=

        countFiles(config.COLOR_OUTPUT_DIRECTORY)+

        countFiles(config.ERROR_OUTPUT_DIRECTORY)+

        countFiles(config.LAYOUT_OUTPUT_DIRECTORY);

    console.log("Total JSON Files :",total);

    console.log("");

    console.log("Finished Successfully.");

    console.log("====================================");

}

function ensureDirectories(){

    [

        config.COLOR_OUTPUT_DIRECTORY,

        config.ERROR_OUTPUT_DIRECTORY,

        config.LAYOUT_OUTPUT_DIRECTORY

    ].forEach(directory=>{

        if(!fs.existsSync(directory)){

            fs.mkdirSync(directory,{

                recursive:true

            });

        }

    });

}

function runPipeline(){

    console.log("");

    console.log("====================================");

    console.log(" UI DATASET GENERATOR ");

    console.log("====================================");

    console.log("");

    ensureDirectories();

    console.log("Generating Color Dataset...");

    generateColorDataset();

    console.log("");

    console.log("Generating Error Dataset...");

    generateErrorDataset();

    console.log("");

    console.log("Generating Layout Dataset...");

    generateLayoutDataset();

    printStatistics();

}

module.exports=runPipeline;