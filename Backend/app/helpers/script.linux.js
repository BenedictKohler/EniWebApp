// Execute a shell script
const { exec, spawn, execFile } = require('child_process');

// Execute a linux file
exports.executeFile = (req, res) => {

    // Had to first do chmod u+x filename
    execFile('/Users/benkohle/Documents/Publicis Sapient/Eni Web App/Backend/scripts/Hello.sh', (error, stdout, stderr) => {

        if (error) {
        console.error(`error: ${error.message}`);
        return;
        }
    
        if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
        }
    
        console.log(`stdout:\n${stdout}`);

        res.status(200).json({"Shell output": stdout});

    });
  
};