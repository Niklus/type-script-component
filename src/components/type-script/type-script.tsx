import { Component, Prop, Element } from '@stencil/core';
import Dexie from 'dexie';
import { local } from '../../utils/lib.uglifyjs';

@Component({
  tag: 'type-script',
  shadow: false,
})
export class TypeScript {
  @Prop() src: string = '';
  @Prop() minify: string = 'false';
  @Element() el: HTMLElement;

  // Database to hold the transpiler
  private db: any = new Dexie('LibDatabase');

  // Minified version of https://unpkg.com/typescript@4.6.3/lib/typescriptServices.js
  private transpiler: string = 'https://cdn.jsdelivr.net/gh/Niklus/typscript@master/typescript.js';

  constructor() {
    this.db.version(1).stores({ tsLib: `buffer` });
  }

  componentDidLoad() {
    if (!this.src) {
      console.error('Please provide a src to your type-script tag');
      return alert('Please provide a src to your type-script tag');
    }

    const tags = document.querySelectorAll('type-script');

    if (tags.length > 1) {
      const alerted = sessionStorage.getItem('alerted') || '';
      if (alerted !== 'yes') {
        alert('Please use only one type-script tag per html page. Read the docs :)');
        sessionStorage.setItem('alerted', 'yes');
      } else {
        console.error('Please use only one type-script tag per html page. Read the docs :)');
      }
      return;
    }

    if (window['ts']) {
      console.log('Found in window');
      return this.loadTsFile(window['ts']);
    }

    this.getFromDataBase().then(data => {
      if (data.length > 0) {
        console.log('Getting from database');

        const tag = document.createElement('script');
        const decoder = new TextDecoder();

        tag.textContent = decoder.decode(data[0].buffer);

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.loadTsFile(window['ts']);
      } else {
        console.log('Getting from network');
        this.loadLibrary()
          .then(ts => {
            this.loadTsFile(ts);
          })
          .then(() => {
            this.addToDatabase();
          });
      }
    });
  }

  trimEach(arr) {
    return arr.map(el => el.trim());
  }

  async loadTsFile(ts) {
    const strArr = this.trimEach(this.src.split(','));

    const promises = strArr.map(async str => {
      const response = await fetch(str);
      const tsCode = await response.text();
      return tsCode;
    });

    Promise.all(promises).then(values => {
      values.forEach(tsCode => {
        const jsCode = ts.transpile(tsCode, {
          target: this.minify === 'true' ? 'es5' : 'es6',
          allowJs: true,
          experimentalDecorators: true,
        });

        const tag = document.createElement('script');
        tag.textContent = this.minify === 'true' ? local.uglify(jsCode) : jsCode;

        this.el.append(tag);
      });
    });
  }

  loadLibrary() {
    const tag = document.createElement('script');
    tag.src = this.transpiler;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return new Promise(resolve => {
      let interval = setInterval(() => {
        if (window['ts']) {
          clearInterval(interval);
          resolve(window['ts']);
        }
      }, 100);
    });
  }

  async addToDatabase() {
    const response = await fetch(this.transpiler);
    const tsLibStr = await response.text();

    const encoder = new TextEncoder();

    const tsLib = {
      buffer: encoder.encode(tsLibStr),
    };

    this.db
      .transaction('rw', this.db.tsLib, () => {
        this.db.tsLib.put(tsLib);
      })
      .then(() => {
        console.log('added to db');
      })
      .catch(function (err: any) {
        console.error(err.stack);
      });
  }

  getFromDataBase() {
    return this.db
      .transaction('r', this.db.tsLib, () => {
        return this.db.tsLib.toArray((buffer: any) => {
          return buffer;
        });
      })
      .catch((err: any) => {
        console.error(err.stack);
      });
  }

  render() {
    return null;
  }
}
