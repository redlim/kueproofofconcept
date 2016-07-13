var kue = require( 'kue' );

var jobs = kue.createQueue();


function create() {
    var name = [ 'tobi', 'loki', 'jane', 'manny' ][ Math.random() * 4 | 0 ];
    var job  = jobs.create( 'video conversion', {
        title: 'converting ' + name + '\'s to avi', user: 1, frames: 200
    } );

    job.on( 'complete', function () {
        console.log(job.data.title + " Job complete" );
    } ).on( 'failed', function () {
        console.log( " Job failed" );
    } ).on( 'progress', function ( progress ) {
        process.stdout.write( '\r  job #' + job.id + ' ' + progress + '% complete' );
    } );

    job.save();

    setTimeout( create, Math.random() * 2000 | 0 );
}

create();

// process video conversion jobs, 1 at a time.

jobs.process( 'video conversion', 1, function ( job, done ) {
    var frames = job.data.frames;

    function next( i ) {
        // pretend we are doing some work
        convertFrame( i, function ( err ) {
            if ( err ) return done( err );
            // report progress, i/frames complete
            job.progress( i, frames );
            if ( i >= frames ) done();
            else next( i + Math.random() * 10 );
        } );
    }

    next( 0 );
} );

function convertFrame( i, fn ) {
    setTimeout( fn, Math.random() * 50 );
}
