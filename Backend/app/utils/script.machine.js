const { exec, spawn, execFileSync } = require("child_process");
const Utils = require('./Utils.js');

// Gets the status of each server in req.body.serverList
// Returns a list of {serverName, status}
exports.getServerStatus = (req, res) => {

    execFile('', [], (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      
        console.log(`stdout:\n${stdout}`);

        let result = Utils.formatRunningServices(stdout);
        res.status(200).json(result);

      });

};

// Gets the status of each service on a server in req.body.data
// Returns a list of {serviceName, serverName, status}
exports.getServiceStatus = (req, res) => {

  let serversString = Utils.convertServerList(req.body.serverList);
  let output = [];

  // For each service check the status on all servers passed in
  for (let service of req.body.serviceList) {

    execFileSync('../../scripts/CheckServices.ps1', [' -serviceName ' + service + ' -servers ' + serversString], (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
    
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
    
      console.log(`stdout:\n${stdout}`);

      let result = Utils.formatServiceStatus(stdout);
      output.push(result);

    });

  }

  res.status(200).json(result);

};

// Used to start a service on servers
exports.startServices = (req, res) => {

  execFile('../../scripts/StartServices.ps1', [], (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
    
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
    
      console.log(`stdout:\n${stdout}`);

      let result = Utils.formatRunningServices(stdout);
      res.status(200).json(result);

    });

};

// Used to stop a service on servers
exports.stopServices = (req, res) => {

  execFile('../../scripts/StopServices.ps1', [], (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
    
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
    
      console.log(`stdout:\n${stdout}`);

      let result = Utils.formatRunningServices(stdout);
      res.status(200).json(result);

    });

};