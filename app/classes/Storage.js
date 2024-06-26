import { log } from '../utils/log';
import { readFileSync, writeFileSync } from '../helpers/fileOps';
import { checkIf } from '../utils/checkIf';
import { isEmpty } from '../utils/funcs';

export default class Storage {
  constructor(filePath, doNotLog = false) {
    this.filePath = filePath;
    this.doNotLog = doNotLog;
  }

  getAll() {
    try {
      const _stream = readFileSync(this.filePath);

      if (
        typeof _stream === 'undefined' ||
        _stream === '' ||
        _stream === null ||
        Object.keys(_stream).length < 1
      ) {
        return {};
      }

      return JSON.parse(_stream);
    } catch (e) {
      if (this.doNotLog) {
        console.error(e, `Storage -> getAll`);
      } else {
        log.error(e, `Storage -> getAll`);
      }
    }
  }

  getItems(keys) {
    checkIf(keys, 'array');

    try {
      if (isEmpty(keys)) {
        return {};
      }

      const allItem = this.getAll();
      const _return = {};

      if (!allItem) {
        return _return;
      }

      keys.map((a) => {
        if (typeof allItem[a] === 'undefined' || allItem[a] === null) {
          return null;
        }

        _return[a] = allItem[a];

        return a;
      });

      return _return;
    } catch (e) {
      if (this.doNotLog) {
        console.error(e, `Storage -> getItems`);
      } else {
        log.error(e, `Storage -> getItems`);
      }
    }
  }

  setAll({ ...data }) {
    try {
      writeFileSync(this.filePath, JSON.stringify({ ...data }));
    } catch (e) {
      if (this.doNotLog) {
        console.error(e, `Storage -> setAll`);
      } else {
        log.error(e, `Storage -> setAll`);
      }
    }
  }

  setItems({ ...data }) {
    try {
      const currentSettings = this.getAll();

      writeFileSync(
        this.filePath,
        JSON.stringify({ ...currentSettings, ...data })
      );
    } catch (e) {
      if (this.doNotLog) {
        console.error(e, `Storage -> setItems`);
      } else {
        log.error(e, `Storage -> setItems`);
      }
    }
  }
}
