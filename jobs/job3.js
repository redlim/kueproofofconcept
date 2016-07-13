var job = {};

job.setLoop = function (number) {
    job.loop = number;
};

job.getLoop = function () {
    return job.loop;
};

job.run = function (callback) {
    var limit = job.loop || 10000;
    for(var i = 0; i< limit;i++){
    }
    console.log("currando." + job.getName());
    callback("oki");
};

job.getName = function () {
    return "job1"
};

module.exports = job;