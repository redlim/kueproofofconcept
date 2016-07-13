var kue = require('kue')
  , jobs = kue.createQueue()
  ;

var CronJob = require('cron').CronJob;
var job1 = require('./jobs/job1');
var job2 = require('./jobs/job2');


var jobsQueue0 = [];
jobsQueue0.push({interval:900000000,name:'data1'});
jobsQueue0.push({interval:2000000,name:'data2'});
jobsQueue0.push({interval:10000000,name:'data3'});

var jobsQueue1 = [];
jobsQueue1.push({interval:9000,name:'data1'});
jobsQueue1.push({interval:2000,name:'data2'});
jobsQueue1.push({interval:1000,name:'data3'});

function jobManager (name,task){
  var job = jobs.create(name, {
    name: task.name,
    interval:task.interval
  });

  job
      .on('complete', function (){
      console.log('Job', job.id, 'with name', job.data.name, 'is done');
    })
      .on('failed', function (){
      console.log('Job', job.id, 'with name', job.data.name, 'has failed');
    })
      .on( 'progress', function ( progress ) {
        process.stdout.write( '\r  job #' + job.id + ' ' + progress + '% complete' );
      } );

  job.save();
}


jobs.process('job1',1 ,function (job, done){
    job1.run(job.data.interval,done);

});

jobs.process('job2', function (job, done){
  job2.run(job.data.interval,done);

});

new CronJob('30 * * * * *', function() {
      for(var i=0;i<jobsQueue0.length;i++){
        jobManager('job1',jobsQueue0[i]);
        jobManager('job2',jobsQueue1[i]);
      }
    }, function () {
      console.log("finish jobs")
    },
    true,
    'America/Los_Angeles' /* Time zone of this job. */
);