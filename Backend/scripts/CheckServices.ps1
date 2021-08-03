#Script to list all the services that have the  
#user passed parameter in its name
#If no service name is provided, it will list all the services
#The list is sorted by status: first Running then Stopped
#The list of servers is passed as an argument in ',' separated values

#To run: powershell.exe checkServices.ps1 -serviceName <a serviceName> -servers server1,server2,server3

param([String]$serviceName, $serversList)

$scriptBlock = {
    param($serviceName)

    Get-Service "*$serviceName*" -computerName $server| Select-Object @{ n='Status'; e={ $_.Status.ToString() } },Name,DisplayName,MachineName | ConvertTo-Json 
}

#Gets services for every server in the List
foreach ($server in $serversList) {
    Invoke-Command -ComputerName $server -ScriptBlock $scriptBlock -ArgumentList $serviceName
}  
