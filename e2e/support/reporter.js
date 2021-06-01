"use strict";
exports.__esModule = true;
var mkdirp = require("mkdirp");
var path = require("path");
var fs = require("fs");
var htmlReports = path.join(process.cwd(), '/reports/html');
var jsonReportDir = path.join(process.cwd(), '/reports/json');
var jsonReportFile = jsonReportDir + '/cucumber_report.json';
var allureResultsDir = path.join(process.cwd(), '/allure-results/');
var allureReportsDir = path.join(process.cwd(), '/allure-reports/');
var reporter = require('cucumber-html-reporter');
var allureReporter = require('cucumberjs-allure-reporter');

var cucumberReporterOptions = {
    jsonFile: jsonReportFile,
    output: htmlReports + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap'
};
var Reporter = /** @class */ (function () {
    function Reporter() {
    }
    Reporter.initializeReport = function () {
        if (!fs.existsSync(jsonReportDir)) {
            mkdirp.sync(jsonReportDir);
        }
        if (!fs.existsSync(allureResultsDir)) {
            mkdirp.sync(allureResultsDir);
        }
        if (!fs.existsSync(allureReportsDir)) {
            mkdirp.sync(allureReportsDir);
        }
    };
    Reporter.createHTMLReport = function () {
        try {
            reporter.generate(cucumberReporterOptions);
            allureReporter.config({
                targetDir: allureReportsDir
            });
        }
        catch (err) {
            if (err) {
                throw new Error('Failed to save cucumber test results to json file.');
            }
        }
    };
    return Reporter;
}());
exports.Reporter = Reporter;