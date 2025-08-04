
let originalConsoleLog: (...args: any[]) => void;

export function interceptConsoleLog(): void {
	if (!originalConsoleLog) {
		originalConsoleLog = console.log;
	}
	console.log = function (...args: any[]) {
		// Suppressed log
		// Optionally: send to analytics or file
	};
}

export function restoreConsoleLog(): void {
	if (originalConsoleLog) {
		console.log = originalConsoleLog;
	}
}