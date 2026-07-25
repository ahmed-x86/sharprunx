import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';

// المتغير الذي سيحفظ نسخة الطرفية الخاصة بالإضافة
let sharpTerminal: vscode.Terminal | null = null;

export function activate(context: vscode.ExtensionContext) {
    
    let runCommand = vscode.commands.registerCommand('sharprunx.runCSharp', async () => {
        
        // 1. التحقق من نظام التشغيل (يدعم لينكس فقط)
        if (os.platform() !== 'linux') {
            vscode.window.showWarningMessage('هذا النظام غير مدعوم حتى الآن. الإضافة تعمل على لينكس فقط.');
            return; // إيقاف التنفيذ إذا لم يكن لينكس
        }

        // 2. الحصول على الملف المفتوح حالياً
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('لا يوجد ملف مفتوح لتشغيله!');
            return;
        }

        const document = editor.document;
        
        // التحقق من أن الملف هو C#
        if (document.languageId !== 'csharp') {
            vscode.window.showErrorMessage('هذا ليس ملف C#!');
            return;
        }

        // 3. حفظ الملف تلقائياً قبل التشغيل
        await document.save();

        // 4. استخراج مسار واسم الملف
        const filePath = document.fileName;
        const fileDir = path.dirname(filePath);
        const fileName = path.basename(filePath);
        const fileNameWithoutExt = path.parse(fileName).name;

        // 5. إنشاء الطرفية أو إعادة استخدامها إذا كانت موجودة
        if (!sharpTerminal || sharpTerminal.exitStatus !== undefined) {
            sharpTerminal = vscode.window.createTerminal('SharpRunX');
        }
        
        sharpTerminal.show();

        // 6. إرسال أمر التشغيل (الذهاب للمجلد -> الترجمة -> التشغيل)
        // يتم استخدام mcs للترجمة، و mono لتشغيل ملف الـ exe الناتج
        const command = `cd "${fileDir}" && mcs "${fileName}" && mono "${fileNameWithoutExt}.exe"`;
        sharpTerminal.sendText(command);
    });

    context.subscriptions.push(runCommand);
}

export function deactivate() {
    // تنظيف الطرفية عند إغلاق الإضافة
    if (sharpTerminal) {
        sharpTerminal.dispose();
    }
}