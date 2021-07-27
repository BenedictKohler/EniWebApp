import axios from 'axios';

class PipelineService {

    async deployEnvironment() {
        let body = {
            "resources": {
                "pipelines": {
                    "version": "1.0.0"
                },
                "repositories": {
                    "self": {
                        "refName": "refs/heads/master"
                    }
                }
            },
            "variables": {
                "addressPrefix": {
                    "value": "10.1.0.0/16"
                },
                "adminKey": {
                    "value": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDVGJ+74Dp5Lxyuvc1vjzP94mRlC1957IoHpm+79k644WlMvrK/hi/ejF8ubpyHYDvRUq/oPuwyxRW+spKvjzQIJ+MO7sCBJZz7aXG5jDt3hYhfWseVKCuC2n/YraTR0lD/OhZYGgp6adb4pIid5ETp8Nw6mw25Coc03WYRTDUIly635PGgDRYORI6A2QKIE6VU+Nv4vke/lyH3KsiaaRVfs4XaWVy0HssQUz+D0NMUU74bz/8sdGUHiqDQRprN2OERM6MvUcJIIEIKWpBpQfd8aCqejrCk8SkAixiBCo1gIfzDhuyx7h+U2QOVAJDq+Q+YaGW8MGf1snXNzbhyJFWQsYSfnyoA4IE7I0inr6lCFC4A9RvSt4ZBW5kP8PtTrsk4UaWZgdB65rX1EvQkHiFnkJ2+GoPaN/Ifqd8FslPXAhKHRumccItuJHXLXVGsZ5CZwQjl/fR2tQcL0Dg2l+FfL4Z/OImOMIkfBKlY4dHUwXAvZp/l7fIdrrI4untIZyU= ziyalras@publicisgroupe.net"
                },
                "adminUsername": {
                    "value": "ziyad"
                },
                "allowedIps": {
                    "value": "[\"82.3.125.49\", \"52.191.24.152\"]"
                },
                "firstMachine": {
                    "value": "true"
                },
                "location": {
                    "value": "eastus"
                },
                "newOrExisting": {
                    "value": "true"
                },
                "operatingSystem": {
                    "value": "Linux"
                },
                "resourceGroup": {
                    "value": "RMTest4"
                },
                "subnetName": {
                    "value": "linuxSubnet"
                },
                "subnetPrefix": {
                    "value": "10.1.0.0/24"
                },
                "ubuntuOSVersion": {
                    "value": "18.04-LTS"
                },
                "virtualNetworkName": {
                    "value": "myvNet"
                },
                "vmName": {
                    "value": "linuxvm"
                }
            }
        };

        let auth = {
            headers: { "Authorization": "Basic YmtvaGxlcjpwajZhd2d6bG5pbngycnUzcWV6bzZlb2hkdW9ybmU3NmI1aXV4aml5NmtxZzJocHR5aWhh" }
        };
        try {
            return await axios.post('https://dev.azure.com/za45/test-project/_apis/pipelines/3/runs?api-version=6.0-preview.1', body, auth);
        }
        catch (err) {
            console.log(err.message);
        }
    }

}


// cGo2YXdnemxuaW54MnJ1M3Flem82ZW9oZHVvcm5lNzZiNWl1eGppeTZrcWcyaHB0eWloYQ==
// Ziyad and Elie Access Token: pj6awgzlninx2ru3qezo6eohduorne76b5iuxjiy6kqg2hptyiha

// Access token: ukdjcyk3mhnqqpa5guag6vdizwchr3jm7jobsplgarzcmijojvoa   but need to encode in base64 to put into header
// Get: https://dev.azure.com/benkohler/ARMPipeline/_apis/pipelines/9/runs/7?api-version=6.0-preview.1

// Note: 4 is definitonId and pipelineId
// Any username can be used in auth but must use token as password

export default new PipelineService();