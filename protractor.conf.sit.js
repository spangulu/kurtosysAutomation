"use strict";
var protractor = require("protractor");
var path = require("path");
var reporter = require("./e2e/support/reporter");
exports.config = {
    restartBrowserBetweenTests: true,
    chromeDriver: 'driver\\chrome\\default\\chromedriver.exe',
    allScriptsTimeout: 30000,
    specs: [
        './e2e/features/**/*.feature',
    ],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--disable-dev-shm-usage']
        }
    },
    directConnect: true,
    baseUrl: 'https://www.kurtosys.com/',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: [
            './e2e/stepdefinitions/**/*.ts',
            './e2e/support/**/*.ts'
        ],
        tags: '@login',
        profile: false,
        compiler: 'ts:ts-node/register',
        format: ['./e2e/support/allureReporter.js', 'json:./reports/json/cucumber_report.json']
    },
    onPrepare: function () {
        require('ts-node').register({
            project: path.join(__dirname, './tsconfig.e2e.json')
        });
        reporter.Reporter.initializeReport();
    },
    onComplete: function () {
        reporter.Reporter.createHTMLReport();
    },
    params: {
        environment: 'sit'
    }
};
