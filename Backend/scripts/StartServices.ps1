#Script to start a specific service on every server in a serverList
#The list of servers is passed as an argument in ',' separated values

#To run: powershell <path to startServices> -serviceName <name of service (not Display name)> -serversList server1,server2,server3

param([String]$serviceName, $serversList)

$scriptBlock = {
    param($service)
    #Check if the service is actually stopped 
    if ((Get-Service $service).Status -eq "Stopped")
    {
    Start-Service $service #Starts the service
    }

}

#Start the services for every server
foreach ($server in $serversList) {
    Invoke-Command -ComputerName $server -ScriptBlock $scriptBlock -ArgumentList $serviceName
} 
