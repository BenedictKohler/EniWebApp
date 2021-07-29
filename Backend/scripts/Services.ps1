param([String]$serviceName)

Get-Service -DisplayName "*$serviceName*" | Sort-Object status -Descending