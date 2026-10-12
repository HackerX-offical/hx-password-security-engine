// Currently we use default configuration via code constants.
// This module is a placeholder for future config file loading (e.g. .hx-pse.rc)

export interface Config {
  interactive: boolean;
  json: boolean;
  verbosity: 'quiet' | 'normal' | 'verbose';
}

export const defaultConfig: Config = {
  interactive: true,
  json: false,
  verbosity: 'normal',
};
