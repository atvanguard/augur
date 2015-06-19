#!/usr/bin/env node
/**
 * Automated tests for augur.js
 * @author Jack Peterson (jack@tinybike.net)
 */

"use strict";

var fs    = require("fs");
var path  = require("path");
var cp = require("child_process");
var util = require("util");
var assert = require("chai").assert;
// var async = require("async");
var rm = require("rimraf");
var chalk = require("chalk");
var Mocha = require("mocha");
var Augur = require("../augur");

var log = console.log;

var DEBUG = false;
// var DATADIR = path.join(process.env.HOME, ".augur");
var DATADIR = path.join(process.env.HOME, ".augur-test");
var AUGUR_CORE = path.join(process.env.HOME, "src", "augur-core");
var UPLOADER = path.join(AUGUR_CORE, "load_contracts.py");
var GOSPEL = "gospel.json";
var CUSTOM_GOSPEL = false;
var NETWORK_ID = "10101";
var PROTOCOL_VERSION = "59";
var MINIMUM_ETHER = 30;
var LOG = "geth.log";

var accounts = [
    "0x639b41c4d3d399894f2a57894278e1653e7cd24c",
    "0x05ae1d0ca6206c6168b42efcd1fbe0ed144e821b",
    "0x4a0cf714e2c1b785ff2d650320acf63be9eb25c6",
    "0x72caf0651be1bb05eff6d21b005db49654784aee",
    "0x0da70d5a92d6cfcd4c12e2a83950676fdf4c95f9",
    "0x676fe049c8f1440a8e3ec1832806b43ae128059f",
    "0x405be667f1a6b2d5149a61057040cade5aada366",
    "0x9a5ab02a8b31d1ccd632936574a14f77788dfe6d",
    "0xebb117ef11769e675e0245062a8e6296dfe42da4",
    "0x2a7e417ff20606e384526ed42d306943caec2d24",
    "0xf0c4ee355432a7c7da12bdef04543723d110d591",
    "0xef2b2ba637921b8cf51b8a89576666a5d4322c69",
    "0x2c97f31d2db40aa57d0e6ca5fa8aedf7d99592db",
    "0xcdc2cdaab90909769ccf823246f04f0da827a732",
    "0xa78ddbe112cb29844d2a26cbc4e52c11e74aaa6c"
];
var enodes = [
    "enode://035b7845dfa0c0980112abdfdf4dc11087f56b77e10d2831f186ca12bc00f5b9327c427d03d9cd8106db01488905fb2200b5706f9e41c5d75885057691d9997c@[::]:30303",
    "enode://4014c7fa323dafbb1ada241b74ce16099efde03f994728a55b9ff09a9a80664920045993978de85cb7f6c2ac7e9218694554433f586c1290a8b8faa186ce072c@[::]:30303",
    "enode://12bcaeb91de58d9c48a0383cc77f7c01decf30c7da6967408f31dc793e08b14e2b470536ebe501a4f527e98e84c7f5431755eae5e0f4ba2556539ab9faa77318@76.14.85.30:30303"
].join(' ');
var geth_flags = [
    "--etherbase", accounts[0],
    "--unlock", accounts[0],
    "--mine",
    "--rpc",
    "--rpccorsdomain", "http://localhost:8080",
    "--shh",
    "--maxpeers", "64",
    "--networkid", NETWORK_ID,
    "--datadir", DATADIR,
    "--protocolversion", PROTOCOL_VERSION,
    "--bootnodes", enodes,
    "--password", path.join(DATADIR, ".password")
];
var gospel_json = path.join(__dirname, GOSPEL);
var check_connection;

log("Create", chalk.magenta("geth"), "log file:", chalk.green(path.join(__dirname, LOG)));
var geth_log = fs.createWriteStream(path.join(__dirname, LOG), {flags : 'w'});

function wait(seconds) {
    var start, delay;
    start = new Date();
    delay = seconds * 1000;
    while ((new Date()) - start <= delay) {}
    return true;
}

function kill_geth(geth) {
    log("Shut down " + chalk.magenta("geth") + "...");
    geth.kill();
}

function spawn_geth(flags) {
    log("Spawn " + chalk.magenta("geth") + " on network " + chalk.green(NETWORK_ID) +
        " (version " + chalk.green(PROTOCOL_VERSION) + ")...");
    var geth = cp.spawn("geth", flags);
    geth.stdout.on("data", function (data) {
        geth_log.write("stdout: " + util.format(data.toString()) + "\n");
    });
    geth.stderr.on("data", function (data) {
        // process.stdout.write(chalk.yellow(data.toString()));
        geth_log.write(util.format(data.toString()) + "\n");
    });
    geth.on("close", function (code) {
        log(chalk.red.bold("geth closed with code " + code));
        geth.kill();
        if (code === 1) {
            wait(5);
            log("Restarting", chalk.magenta("geth") + "...");
            return spawn_geth(flags);
        }
    });
    return geth;
}

function mine_minimum_ether(geth, account, next) {
    var balance = Augur.bignum(Augur.balance(account)).dividedBy(Augur.ETHER).toNumber();
    if (balance < MINIMUM_ETHER) {
        if (balance > 0) {
            log("Balance: " + chalk.green(balance) + chalk.gray(" ETH, waiting for ") +
                chalk.green(MINIMUM_ETHER) + chalk.gray("..."));
        }
        setTimeout(function () {
            mine_minimum_ether(geth, account, next);
        }, 5000);
    } else {
        next(geth);
    }
}

function display_outputs(geth) {
    var branch = Augur.branches.dev;
    var period = parseInt(Augur.getVotePeriod(branch)) - 1;
    var num_reports = Augur.getNumberReporters(branch);
    var num_events = Augur.getNumberEvents(branch, period);
    var flatsize = num_events * num_reports;

    var reporters = accounts;
    var ballots = new Array(flatsize);
    var i, j;
    for (i = 0; i < num_reports; ++i) {
        var reporterID = Augur.getReporterID(branch, i);
        var ballot = Augur.getReporterBallot(branch, period, reporterID);
        if (ballot[0] !== 0) {
            for (j = 0; j < num_events; ++j) {
                ballots[i*num_events + j] = ballot[j];
            }
        } else {
            for (j = 0; j < num_events; ++j) {
                ballots[i*num_events + j] = '0';
            }
        }
    }
    log("Ballots:");
    log(Augur.fold(ballots, num_events));

    log("\nCentered:");
    var wcd = Augur.fold(Augur.getWeightedCenteredData(branch, period).slice(0, flatsize), num_events);
    log(wcd);

    log("\nInterpolated:");
    var reports_filled = Augur.fold(Augur.getReportsFilled(branch, period).slice(0, flatsize), num_events);
    log(reports_filled);

    var outcomes = Augur.getOutcomesFinal(branch, period).slice(0, num_events);
    log("\nOutcomes:");
    log(outcomes);

    var smooth_rep = Augur.getSmoothRep(branch, period).slice(0, num_reports);
    log("\nSmoothed reputation fraction:");
    log(smooth_rep);

    var reporter_payouts = Augur.getReporterPayouts(branch, period).slice(0, num_reports);
    log("\nReporter payouts:");
    log(reporter_payouts);

    var reputation = [];
    var total_rep = 0;
    for (i = 0; i < reporters.length; ++i) {
        reputation.push(Augur.getRepBalance(branch, reporters[i]));
        total_rep += Number(Augur.getRepBalance(branch, reporters[i]));
    }
    log("\nUpdated reputation:");
    log(reputation);

    log("\nTotal reputation (" + (47*reporters.length).toString() + " expected): " + total_rep.toString());
    assert.equal(total_rep, reporters.length * 47);

    kill_geth(geth);
}

function postupload_tests_5(geth) {
    var mocha = new Mocha();
    mocha.addFile(path.join(__dirname, "test_consensus.js"));
    // mocha.addFile(path.join(__dirname, "test_score.js"));
    // mocha.addFile(path.join(__dirname, "test_resolve.js"));
    // mocha.addFile(path.join(__dirname, "test_payments.js"));
    // mocha.addFile(path.join(__dirname, "test_markets.js"));
    // mocha.addFile(path.join(__dirname, "test_comments.js"));
    mocha.run(function (failures) {
        process.on("exit", function () { process.exit(failures); });
        display_outputs(geth);
    });
}

function postupload_tests_4(geth) {
    var mocha = new Mocha();
    mocha.addFile(path.join(__dirname, "test_interpolate.js"));
    mocha.run(function (failures) {
        process.on("exit", function () { process.exit(failures); });
        postupload_tests_5(geth);
    });
}

function postupload_tests_3(geth) {
    var mocha = new Mocha();
    // mocha.addFile(path.join(__dirname, "test_buyAndSellShares.js"));
    // mocha.addFile(path.join(__dirname, "fastforward.js"));
    mocha.addFile(path.join(__dirname, "test_ballot.js"));
    mocha.run(function (failures) {
        process.on("exit", function () { process.exit(failures); });
        postupload_tests_4(geth);
    });
}

function postupload_tests_2(geth) {
    var mocha = new Mocha();
    mocha.addFile(path.join(__dirname, "test_addEvent.js"));
    // mocha.addFile(path.join(__dirname, "test_createMarket.js"));
    mocha.run(function (failures) {
        process.on("exit", function () { process.exit(failures); });
        postupload_tests_3(geth);
    });
}

function postupload_tests_1(geth) {
    var mocha = new Mocha();
    mocha.addFile(path.join(__dirname, "test_ethrpc.js"));
    // mocha.addFile(path.join(__dirname, "test_invoke.js"));
    // mocha.addFile(path.join(__dirname, "test_reporting.js"));
    mocha.addFile(path.join(__dirname, "test_batch.js"));
    // mocha.addFile(path.join(__dirname, "test_expiring.js"));
    // mocha.addFile(path.join(__dirname, "test_augur.js"));
    mocha.addFile(path.join(__dirname, "test_createEvent.js"));
    mocha.run(function (failures) {
        process.on("exit", function () { process.exit(failures); });
        postupload_tests_2(geth);
    });
}

function faucets(geth) {
    require(path.join(__dirname, "faucets.js"));
    delete require.cache[require.resolve(path.join(__dirname, "faucets.js"))];
    setTimeout(function () {
        var cash_balance = Augur.getCashBalance(Augur.coinbase);
        var rep_balance = Augur.getRepBalance(Augur.branches.dev, Augur.coinbase);
        var ether_balance = Augur.bignum(Augur.balance(Augur.coinbase)).dividedBy(Augur.ETHER).toFixed();
        log(chalk.cyan("Balances:"));
        log("Cash:       " + chalk.green(cash_balance));
        log("Reputation: " + chalk.green(rep_balance));
        log("Ether:      " + chalk.green(ether_balance));
        kill_geth(geth);
        for (var i = 0, len = accounts.length; i < len; ++i) {
            if (geth_flags[1] === accounts[i]) break;
        }
        log(chalk.blue.bold("\nAccount " + (i+1) + ": ") + chalk.green(accounts[i+1]));
        if (i < accounts.length - 1) {
            geth_flags[1] = accounts[i+1];
            geth_flags[3] = accounts[i+1];
            setTimeout(function () {
                check_connection(
                    spawn_geth(geth_flags),
                    accounts[i+1],
                    mine_minimum_ether,
                    faucets
                );
            }, 5000);
        } else {
            geth_flags[1] = accounts[0];
            geth_flags[3] = accounts[0];
            setTimeout(function () {
                check_connection(
                    spawn_geth(geth_flags),
                    accounts[0],
                    mine_minimum_ether,
                    postupload_tests_1
                );
            }, 5000);
        }
    }, 10000);
}

function upload_contracts(geth) {
    log(chalk.red.bold("Upload contracts to test chain..."));
    var uploader = cp.spawn(UPLOADER, ["--BLOCKTIME=1.75"]);
    uploader.stdout.on("data", function (data) {
        process.stdout.write(chalk.cyan(data.toString()));
    });
    uploader.stderr.on("data", function (data) {
        process.stdout.write(chalk.red(data.toString()));
    });
    uploader.on("close", function (code) {
        log(chalk.red.bold("Uploader closed with code " + code));
        cp.exec(path.join(AUGUR_CORE, "generate_gospel.py -j"), function (err, stdout) {
            if (err) throw err;
            log("Write contract addresses to " + chalk.green(gospel_json) + "...");
            fs.writeFileSync(gospel_json, stdout.toString());
            CUSTOM_GOSPEL = true;
            kill_geth(geth);
            log(chalk.blue.bold("\nAccount 1: ") + chalk.green(accounts[1]));
            geth_flags[1] = accounts[1];
            geth_flags[3] = accounts[1];
            wait(10);
            check_connection(
                spawn_geth(geth_flags),
                accounts[1],
                mine_minimum_ether,
                faucets
            );
        });
    });
}

function preupload_tests(geth) {
    var mocha = new Mocha();
    mocha.addFile(path.join(__dirname, "test_fixedpoint.js"));
    mocha.addFile(path.join(__dirname, "test_encoder.js"));
    mocha.run(function (failures) {
        process.on("exit", function () { process.exit(failures); });
        upload_contracts(geth);
    });
}

function check_connection(geth, account, callback, next, count) {
    count = count || 0;
    if (CUSTOM_GOSPEL) {
        log("Reading contracts from " + chalk.green(gospel_json));
        Augur.contracts = JSON.parse(fs.readFileSync(gospel_json));
    }
    wait(5);
    if (Augur.connect()) {
        var balance = Augur.balance(account);
        if (balance && !balance.error) {
            balance = Augur.bignum(balance).dividedBy(Augur.ETHER).toFixed();
            log("Connected on account", chalk.green(account));
            log(chalk.green(Augur.blockNumber()), chalk.gray("blocks"));
            log("Balance:", chalk.green(balance), chalk.gray("ETH"));
            callback(geth, account, next);
        } else {
            kill_geth(geth);
            check_connection(spawn_geth(geth), account, callback, next);
        }
    } else {
        if (count && count > 2) {
            check_connection(geth, account, callback, next, ++count);
        }
    }
}

var old_spawn = cp.spawn;

cp.spawn = function () {
    if (DEBUG) log(arguments);
    var result = old_spawn.apply(this, arguments);
    return result;
};

function reset_datadir() {
    log("Reset " + chalk.magenta("augur") + " data directory: " + chalk.green(DATADIR));
    var directories = [ "blockchain", "extra", "nodes", "state" ];
    for (var i = 0, len = directories.length; i < len; ++i) {
        rm.sync(path.join(DATADIR, directories[i]));
    }
}

var args = process.argv.slice(2);

if (args[0] === "reset") {
    reset_datadir();
    check_connection(
        spawn_geth(geth_flags),
        accounts[0],
        mine_minimum_ether,
        preupload_tests
    );
} else if (args[0] === "faucets") {
    log(chalk.blue.bold("\nAccount 2: ") + chalk.green(accounts[2]));
    geth_flags[1] = accounts[2];
    geth_flags[3] = accounts[2];
    check_connection(
        spawn_geth(geth_flags),
        accounts[2],
        mine_minimum_ether,
        faucets
    );
} else {
    check_connection(
        spawn_geth(geth_flags),
        accounts[0],
        postupload_tests_3
    );
}
