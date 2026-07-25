import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';


let sharpTerminal: vscode.Terminal | null = null;

export function activate(context: vscode.ExtensionContext) {
    
    let runCommand = vscode.commands.registerCommand('sharprunx.runCSharp', async () => {

        if (os.platform() !== 'linux') {
            vscode.window.showWarningMessage('هذا النظام غير مدعوم حتى الآن. الإضافة تعمل على لينكس فقط.');
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('لا يوجد ملف مفتوح لتشغيله!');
            return;
        }

        const document = editor.document;

        if (document.languageId !== 'csharp') {
            vscode.window.showErrorMessage('هذا ليس ملف C#!');
            return;
        }

        await document.save();

        const filePath = document.fileName;
        const fileDir = path.dirname(filePath);
        const fileName = path.basename(filePath);
        const fileNameWithoutExt = path.parse(fileName).name;

        if (!sharpTerminal || sharpTerminal.exitStatus !== undefined) {
            sharpTerminal = vscode.window.createTerminal('SharpRunX');
        }
        
        sharpTerminal.show();

        const command = `cd "${fileDir}" && mcs "${fileName}" && mono "${fileNameWithoutExt}.exe"`;
        sharpTerminal.sendText(command);
    });

    context.subscriptions.push(runCommand);
}

export function deactivate() {

    if (sharpTerminal) {
        sharpTerminal.dispose();
    }
}