#Script to stop a specific service on every server in a serverList
#The list of servers is passed as an argument in ',' separated values

#To run: powershell <path to stopServices> -serviceName <name of service (not Display name)> -serversList server1,server2,server3

param([String]$serviceName, $serversList)

$scriptBlock = {
    param($service)
    #Check if the service is actually running 
    if ((Get-Service $service).Status -eq "Running")
    {
    Stop-Service $service #Stops the service
    }

}

#Stops the services for every server
foreach ($server in $serversList) {
    Invoke-Command -ComputerName $server -ScriptBlock $scriptBlock -ArgumentList $serviceName
} 
