import './style.css';
import { interceptConsoleLog } from './utils/consoleInterceptor';

interceptConsoleLog();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
`;

