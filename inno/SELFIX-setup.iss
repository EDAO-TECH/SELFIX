; Inno Setup installer script for SELFIX
[Setup]
AppName=SELFIX
AppVersion=1.1.1
DefaultDirName={pf}\SELFIX
DefaultGroupName=SELFIX
UninstallDisplayIcon={app}\selfix_gui.exe
OutputBaseFilename=SELFIX-Setup-v1.1.1
Compression=lzma
SolidCompression=yes

[Files]
Source: "dist\selfix_gui.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\SELFIX"; Filename: "{app}\selfix_gui.exe"
Name: "{commondesktop}\SELFIX"; Filename: "{app}\selfix_gui.exe"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Create a desktop icon"; GroupDescription: "Additional icons:"
