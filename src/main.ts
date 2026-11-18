import './style.css';
import { App } from './app.ts';

const rootElement = document.querySelector<HTMLElement>('#app');

if (rootElement) {
  const app = new App(rootElement);
  app.init();
}
