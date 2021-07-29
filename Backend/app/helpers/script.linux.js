// Execute a shell script
const { exec, spawn, execFile } = require("child_process");
const SSH = require("simple-ssh");

// Convert .pem to ssh rsa key: ssh-keygen -y -f ./app/helpers/LinuxTest1_key.pem > public_key1.pub

// Execute a linux file
exports.executeFile = (req, res) => {

  /*
  var ssh = new SSH({
    host: "52.152.219.163",
    user: "azureuser",
    timeout: 100000,
    key: require('fs').readFileSync("/Users/benkohle/.ssh/id_rsa.pub")
  });

  ssh
    .exec("/home/azureuser/Hello.sh", {
      out: function (stdout) {
        console.log(stdout);
      },
      err: function(stderr) {
        console.log(stderr); // this-does-not-exist: command not found
      }
    })
    .start();

  ssh.on("error", (err) => {
    console.log(err);
  }) */


  var ssh = new SSH({
    host: "52.191.251.178",
    user: "azureuser",
    timeout: 100000,
    key: "./converted_key.pub"
  });

  ssh
    .exec("/home/azureuser/Hello.sh", {
      out: function (stdout) {
        console.log(stdout);
      },
      err: function(stderr) {
        console.log(stderr);
      }
    })
    .start();

  ssh.on("error", (err) => {
    console.log(err);
  }) 

  /*
  ssh.exec('sudo echo "Pseudo-sudo"', {
    pty: true,
    out: console.log.bind(console)
}).start();

  ssh.on('ready', () => {

    ssh.exec('sudo echo "Pseudo-sudo"', {
      pty: true,
      out: console.log.bind(console)
  }).start();

  });

  ssh.on('error', (error) => {
    console.log(error);
  });

  /*

  // Had to first do chmod u+x filename
  execFile("/home/azureuser/Hello.sh", (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout:\n${stdout}`);

    res.status(200).json({ "Shell output": stdout });
  });

  // Had to first do chmod u+x filename
  execFile(
    "/Users/benkohle/Documents/Publicis Sapient/Eni Web App/Backend/scripts/Hello.sh",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout:\n${stdout}`);

      res.status(200).json({ "Shell output": stdout });
    }
  );

    execFile(__dirname + '/Hello.bat', (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
  
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  
    console.log(`stdout:\n${stdout}`);
  });

  const child = spawn('ls');

  child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
  });
  
  child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
  });*/

};
