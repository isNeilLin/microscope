Package.describe({
  name: 'neillin:errors',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A pattern to display application errors to the user',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.2.2');
  api.use(['ecmascript','minimongo','mongo-livedata','templating'],'client');
  api.addFiles(['error.js','errors_list.html','errors_list.js'],'client');
  if(api.export){
    api.export('Errors');
  }
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('neillin:errors');
  api.mainModule('errors-tests.js');
});
