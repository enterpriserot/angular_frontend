/* jshint -W117, -W030 */
describe('main routes', function() {
  describe('state', function() {
    var view = 'app/main/main.html';

    beforeEach(function() {
      module('app.main', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state main to url / ', function() {
      expect($state.href('main', {})).to.equal('/');
    });

    it('should map /main route to main View template', function() {
      expect($state.get('main').templateUrl).to.equal(view);
    });

    it('of main should work with $state.go', function() {
      $state.go('main');
      $rootScope.$apply();
      expect($state.is('main'));
    });
  });
});
