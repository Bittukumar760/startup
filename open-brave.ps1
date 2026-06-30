# open-brave.ps1
# Opens Brave Browser from PowerShell without Selenium or Playwright

param(
    [string]$Url = "https://www.google.com"
)

$bravePaths = @(
    "$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\Application\brave.exe",
    "$env:PROGRAMFILES\BraveSoftware\Brave-Browser\Application\brave.exe",
    "${env:PROGRAMFILES(X86)}\BraveSoftware\Brave-Browser\Application\brave.exe"
)

$bravePath = $null
foreach ($path in $bravePaths) {
    if (Test-Path $path) {
        $bravePath = $path
        break
    }
}

if ($null -eq $bravePath) {
    Write-Error "Brave Browser not found. Please install it from https://brave.com"
    exit 1
}

Write-Host "Opening Brave Browser: $Url"
Start-Process -FilePath $bravePath -ArgumentList $Url
