# based on: https://stackoverflow.com/a/41406026
# go to shell:startup in explorer, create the shortcut
# Target:       C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -NoExit -Command "C:\Users\entsc\aix-decision-tree\startup.ps1"
# Start In:     C:\my-script-path


# start frontend
Start-Job -FilePath "C:\Users\entsc\aix-decision-tree\startup-frontend.ps1"

# start browser
C:/'Program Files'/Google/Chrome/Application/chrome.exe http://localhost:3000 `
    --kiosk `
    --incognito `
    --disable-pinch `
    --overscroll-history-navigation=0