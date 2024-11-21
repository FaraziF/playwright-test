import { Browser, BrowserContextOptions, Page } from '@playwright/test';
import fs from 'fs';

const { LOCAL, SITE_PATH } = process.env;

export const helpers = {
  // create env
  createEnvVar(key: string, value: string) {
    console.log(`${key}=${value}`);
    const content = '\n' + `${key}=${value}`;
    process.env[key] = value;
    // this.appendFile('.env', content); // for local testing
  },

  // escape regex
  escapeRegex: (str: string): string => {
    const escapePatten = /[.*+\-?^$|(){}[\]\\]/g; // Special Regex Characters: ., *, +,-, ?, ^, $, |, (, ), {, }, [, ], \, ],
    return str.replace(escapePatten, '\\$&'); // $& means the whole matched string
  },

  // read file
  readFile(filePath: string) {
    return fs.readFileSync(filePath, 'utf8');
  },

  // read json
  readJson(filePath: string) {
    if (fs.existsSync(filePath)) {
      return JSON.parse(this.readFile(filePath));
    } else {
      console.log(`File not found: ${filePath}`);
      return null;
    }
  },

  // read a single json data
  readJsonData(filePath: string, propertyName: string) {
    const data = this.readJson(filePath);
    return data[propertyName];
  },
};
