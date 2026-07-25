# SharpRunX

**SharpRunX** is a lightweight VS Code / VSCodium extension designed specifically for Linux users to run raw C# files instantly without the need for complex `.csproj` setups.

## Features

* **One-Click Execution:** Run raw `.cs` files instantly with a single click or keyboard shortcut.
* **Auto-Save:** Automatically saves your active file before compiling and running.
* **Native Linux Experience:** Uses `mcs` (Mono C# compiler) and `mono` runtime to execute your code blazingly fast directly in the integrated terminal.
* **Lightweight:** No need to initialize full `.NET` projects just to test a simple C# script.

## Requirements

For this extension to work perfectly, your system must meet the following requirements:

1. **Operating System:** This extension is currently designed for **Linux** only.
2. **Mono Project:** You must have the Mono runtime and compiler installed on your system.
   * **Arch Linux:** `sudo pacman -S mono`
   * **Debian/Ubuntu:** `sudo apt install mono-complete`

## Usage

1. Open any raw `.cs` file (e.g., `Program.cs`).
2. Do one of the following:
   * Click the **Play (Run)** icon `▶` located in the top-right corner of the editor.
   * Use the default keyboard shortcut: `Ctrl+Alt+C`.
3. The extension will automatically open a terminal, compile your code to an `.exe` file, and run it using Mono.

## Known Limitations

* **Linux Only:** Currently, running this on Windows or macOS will trigger an OS limitation warning.
* **Raw Files Only:** This extension is designed for single, raw `.cs` files. It does not use the `dotnet run` command and is not intended for modern `.NET` project folders (which contain `.csproj` files).

## Release Notes

### 1.0.0
* Initial release of SharpRunX.
* Added support for `mcs` and `mono`.
* Added OS-check verification (Linux only).
* Added editor title menu run button and `Ctrl+Alt+C` keybinding.

---
*Developed with by ahmed-x86*