(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[Repair on time Error] ',
    appTitle: 'Repair on time'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider',
  '$translateProvider','$translatePartialLoaderProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider,
    $translateProvider, $translatePartialLoaderProvider) {

    $translateProvider.registerAvailableLanguageKeys(['es','en'],{
        'es-ES': 'es',
        'en-US': 'en',
        'en-UK': 'en'
      });

    $translatePartialLoaderProvider.addPart('core');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{part}/{lang}.json',
      loadFailureHandler: 'MyErrorHandler'
    });
    $translateProvider.useCookieStorage();

    $translateProvider
    .determinePreferredLanguage()
    .fallbackLanguage('en')
    .useSanitizeValueStrategy('sce');
    // .useSanitizeValueStrategy('sanitize');
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });

  }

})();
