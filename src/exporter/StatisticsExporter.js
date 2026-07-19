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

function percentage(count, total) {

    if (total === 0) {

        return 0;

    }

    return Number(

        ((count / total) * 100).toFixed(2)

    );

}

function exportStatistics(summary) {

    ensureDirectory(

        config.STATISTICS_OUTPUT_DIRECTORY

    );

    const totalDesigns =

        summary.total ||

        (

            summary.normal.generated +

            summary.color.generated +

            summary.error.generated +

            summary.layout.generated

        );

    const statistics = {

        //-------------------------------------------------
        // Metadata
        //-------------------------------------------------

        generatedAt: new Date().toISOString(),

        datasetVersion:

            config.DATASET_VERSION,

        author:

            config.AUTHOR,

        description:

            config.DESCRIPTION,

        //-------------------------------------------------
        // Overall Summary
        //-------------------------------------------------

        totalDesigns,

        datasetsGenerated: 4,

        //-------------------------------------------------
        // Dataset Breakdown
        //-------------------------------------------------

        datasets: {

            normal: {

                generated:

                    summary.normal.generated,

                percentage:

                    percentage(

                        summary.normal.generated,

                        totalDesigns

                    ),

                outputDirectory:

                    summary.normal.output

            },

            color: {

                generated:

                    summary.color.generated,

                percentage:

                    percentage(

                        summary.color.generated,

                        totalDesigns

                    ),

                outputDirectory:

                    summary.color.output

            },

            error: {

                generated:

                    summary.error.generated,

                percentage:

                    percentage(

                        summary.error.generated,

                        totalDesigns

                    ),

                outputDirectory:

                    summary.error.output

            },

            layout: {

                generated:

                    summary.layout.generated,

                percentage:

                    percentage(

                        summary.layout.generated,

                        totalDesigns

                    ),

                outputDirectory:

                    summary.layout.output

            }

        },

        //-------------------------------------------------
        // Generator Configuration
        //-------------------------------------------------

        configuration: {

            randomizeTheme:

                config.RANDOMIZE_THEME,

            randomizeLayout:

                config.RANDOMIZE_LAYOUT,

            randomizeContent:

                config.RANDOMIZE_CONTENT,

            validateDatasets:

                config.VALIDATE_DATASETS,

            skipInvalidDesigns:

                config.SKIP_INVALID_DESIGNS

        }

    };

    const filePath = path.join(

        config.STATISTICS_OUTPUT_DIRECTORY,

        "overall_statistics.json"

    );

    fs.writeFileSync(

        filePath,

        JSON.stringify(

            statistics,

            null,

            config.JSON_INDENTATION

        )

    );

    console.log(

        `Statistics exported to ${filePath}`

    );

    return statistics;

}

module.exports = {

    exportStatistics

};