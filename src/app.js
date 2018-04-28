const cluster = require("cluster");
// Code to run if we're in the master process
// Count the machine's CPUs
const cpuCount = require("os").cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  cluster.on("exit", function(worker, code, signal) {
    cluster.fork();
  });
  //Code to run if we're in a worker process
} else {
  require("./index.js");
}
