var job = {};

job.setLoop = function (number) {
    job.loop = number;
};

job.getLoop = function () {
    return job.loop;
};

job.run = function (interval,callback) {
    for(var i = 0; i< interval;i++){
    }
    console.log("currando. Job 2 interval:" + interval);
    callback();
    

};


module.exports = job;