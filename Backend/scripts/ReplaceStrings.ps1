#Powershell script to replace strings in a file
#Arguments:
#infile: The input file
#jsonObject: A json with key:value pairs
#outfile: Path to a new file, with the modified version of Infile

############################ Notes: #################################
#                                                                   #
#                    Replaces key by value                          #
#         Assumes the placeholder has the **PLACEHOLDER** format    #
#                 The code is case sensitive!!                      #
#                                                                   #
#####################################################################

#To run: .\replaceStrings.ps1 -file <path to infile> -jsonObject '{"key1":"value1","key2","valu2"} -outfile <path to outfile>


param($infile, $jsonObject, $outfile)

function replace($word, $replacement){
    #Replaces the contents of the outfile
    ((Get-Content -path $outfile -Raw).Replace("**$word**", $replacement)) | Set-Content -Path $outfile 
}

$replacementPairs = $jsonObject | ConvertFrom-Json

#Checks if the outfile doesn't exists
if (!(Test-Path $outfile)) {
    New-Item $outfile
    Copy-Item -Path $infile -Destination $outfile
}

foreach($property in $replacementPairs.PSObject.Properties) {
    replace $property.Name $property.Value
} 
