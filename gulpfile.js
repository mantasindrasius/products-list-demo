"use strict";

var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    http = require('http'),
    drivers = require('./client/spec/e2e-drivers.js').drivers,
    karma = require('karma').server,
    bower = require('gulp-bower'),
    traceur = require('gulp-traceur'),
    mocha = require('gulp-mocha');

var server;
var serverPort = 9999;
var serverJar = 'target/scala-2.10/sku-demo_2.10-1.0-one-jar.jar';
var reporter = 'dot';

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('client/app/bower_components/'))
});

gulp.task('transpile', function() {
    return gulp.src('client/spec/**/*.js')
        .pipe(traceur())
        .pipe(gulp.dest('target/client/spec/'));
});

gulp.task('transpile-server-e2e', function() {
    return gulp.src('src/test/resources/e2e/**/*.js')
        .pipe(traceur())
        .pipe(gulp.dest('target/server-e2e/'));
});

gulp.task('package-server', function(cb) {
    exec('sbt one-jar', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('run-server', function () {
    server = spawn('java', ['-jar', serverJar, 'forum.conf', '9902']);

    server.on('close', function (code, signal) {
        console.log('child process terminated due to receipt of signal '+signal);
    });

    server.on('exit', function() {
        console.log('Process has exited');
    })
});

gulp.task('wait-for-server', function(cb) {
    function retry(numTries) {
        function processError() {
            if (numTries <= 1)
                cb();
            else
                setTimeout(function() { retry(numTries - 1); }, 1000);
        }

        http.get('http://localhost:' + serverPort + '/index.html', function (res) {
            console.log("Got response: " + res.statusCode);

            cb();
        }).on('error', function (e) {
            //cb();

            console.log("Retries left... " + numTries);

            processError();
        });
    }

    retry(40)
});

gulp.task('run-packaged-server', ['package-server'], function(cb) {
    gulp.start('run-server');
    cb();
});

gulp.task('ready-server', ['run-server', 'wait-for-server'], function() {
    console.log('Server running as PID ' + server.pid);
});

gulp.task('run-contract', function (done) {
    startKarma({
        configFile: __dirname + '/karma-server.conf.js',
        singleRun: true,
        autoWatch: false
    }, done);
});

gulp.task('run-server-e2e', ['transpile-server-e2e'], function (done) {
    startKarma({
        configFile: __dirname + '/karma-server-e2e.conf.js',
        singleRun: true,
        autoWatch: false
    }, done);
});

gulp.task('server-e2e', ['ready-server'], function() {
    gulp.start('run-server-e2e', stopServer);
});


gulp.task('contract', ['transpile', 'ready-server'], function() {
    gulp.start('run-contract', stopServer);
});

gulp.task('run-acceptance', function () {
    return gulp.src('target/client/spec/acceptance/sku-page.js')
        .pipe(configedMocha())
        .on('finish', function() {
            drivers.stop();
        });
});

gulp.task('acceptance', ['transpile', 'ready-server'], function() {
    gulp.start('run-acceptance', stopServer);
});

gulp.task('test', ['transpile'], function (done) {
    startKarma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        autoWatch: false
    }, done);
});

gulp.task('server-tests', ['ready-server'], function() {
    gulp.start('run-server-e2e', function() {
        gulp.start('run-contract', function () {
            gulp.start('run-acceptance', stopServer)
        })
    });
});

gulp.task('all-tests', ['test'], function(cb) {
    gulp.start('server-tests');

    cb();
});

gulp.task('default', ['all-tests']);

gulp.task('ci', function() {
    reporter = 'teamcity';

    gulp.start('all-tests');
});

function stopServer() {
    console.log('Stopping the server');
    server.kill('SIGINT');
}

function startKarma(options, cb) {
    options.reporters = ['teamcity'];

    karma.start(options, cb);
}

function configedMocha() {
    var mochaReporter = 'dot'

    if (reporter == 'teamcity')
        mochaReporter = 'mocha-teamcity-reporter'

    return mocha({
        reporter: mochaReporter
    })
}