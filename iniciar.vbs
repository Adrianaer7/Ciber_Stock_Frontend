Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "D:\Adrian\Ciber\Ciber_Stock_Frontend\iniciarcliente.bat" & Chr(34), 0
Set WinScriptHost = Nothing
