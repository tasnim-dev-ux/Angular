import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

declare const window: any;

if (window.electron) {
  const storage = window.electron.storage;
  window.localStorage = {
    setItem: (key: string, value: string) => storage.setSync(key, value),
    getItem: (key: string) => {
      try {
        return storage.getSync(key) || null;
      } catch {
        return null;
      }
    },
    removeItem: (key: string) => storage.removeSync(key),
    clear: () => storage.clearSync(),
    key: (index: number) => null,
    get length() { return 0; }
  };
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
