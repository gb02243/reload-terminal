import * as vscode from 'vscode';

const SPLIT_WAIT_TIMEOUT_MS = 750;
const SPLIT_WAIT_POLL_MS = 25;

function waitForSplitTerminal(oldTerminal: vscode.Terminal): Promise<vscode.Terminal | undefined> {
	return new Promise((resolve) => {
		let settled = false;

		const finish = (terminal: vscode.Terminal | undefined) => {
			if (settled) {
				return;
			}
			settled = true;
			openedDisposable.dispose();
			clearInterval(interval);
			clearTimeout(timeout);
			resolve(terminal);
		};

		const openedDisposable = vscode.window.onDidOpenTerminal((terminal) => {
			if (terminal !== oldTerminal) {
				finish(terminal);
			}
		});

		const interval = setInterval(() => {
			const active = vscode.window.activeTerminal;
			if (active && active !== oldTerminal) {
				finish(active);
			}
		}, SPLIT_WAIT_POLL_MS);

		const timeout = setTimeout(() => {
			const active = vscode.window.activeTerminal;
			finish(active && active !== oldTerminal ? active : undefined);
		}, SPLIT_WAIT_TIMEOUT_MS);
	});
}

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('reload-terminal.reload', async () => {
		const oldTerminal = vscode.window.activeTerminal;
		if (!oldTerminal) {
			void vscode.window.showInformationMessage('No active terminal to reload.');
			return;
		}

		try {
			const splitTerminalPromise = waitForSplitTerminal(oldTerminal);
			await vscode.commands.executeCommand('workbench.action.terminal.split');
			const splitTerminal = await splitTerminalPromise;

			oldTerminal.dispose();

			if (splitTerminal) {
				splitTerminal.show(true);
			}

			await vscode.commands.executeCommand('workbench.action.terminal.focus');
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			void vscode.window.showErrorMessage(`Failed to reload terminal: ${message}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
