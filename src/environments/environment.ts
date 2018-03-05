// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    production: false,
    hmr:    false,
    firebase: {
      apiKey: 'AIzaSyDjP3ZEYceddaURs9l-g7ukZvcBmtFvZGg',
      authDomain: 'raphaelwellnesscenter-suja.firebaseapp.com',
      databaseURL: 'https://raphaelwellnesscenter-suja.firebaseio.com/',
      projectId: 'raphaelwellnesscenter-suja',
      storageBucket: 'raphaelwellnesscenter-suja.appspot.com'
    }
  };