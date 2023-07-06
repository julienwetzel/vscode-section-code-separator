import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// listen for save event
	context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(event => {
		const document = event.document;

		// check if the document is a Rust file
		if (document.languageId === 'rust') {
			const edits = provideCommentFormattingEdits(document);
			// create WorkspaceEdit
			let wsEdit = new vscode.WorkspaceEdit();
			for (let edit of edits) {
				wsEdit.replace(document.uri, edit.range, edit.newText);
			}
			// apply edits
			vscode.workspace.applyEdit(wsEdit);
		}
	}));
}

function provideCommentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
	let edits: vscode.TextEdit[] = [];

	for (let i = 0; i < document.lineCount; i++) {
		let line = document.lineAt(i);
		let match = line.text.match(/(^\s*\/\/\s#{2,})(.*?#{2,})?(.*)?$/);

		if (match) {
			let G1 = match[1].length;
			let G2 = match[2] ? match[2].length : 0;
			let G3 = match[3] ? match[3].length : 0;

			let preservedLength = G1 + G2;
			let dashCount = 80 - preservedLength - 1; // le 1 pour l'espace supplémentaire entre le # et le -

			// Truncate the line to the preserved length
			let newText = line.text.substring(0, preservedLength);
			// Add the closing hash marks, a space, and the dashes
			newText += ' ' + '-'.repeat(dashCount);

			let edit = vscode.TextEdit.replace(line.range, newText);
			edits.push(edit);
		}
	}

	return edits;
}
