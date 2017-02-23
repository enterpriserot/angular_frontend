/* jshint -W117, -W030 */
describe('signup routes', function() {
  describe('state', function() {
    var view = 'app/signup/signup.html';

    beforeEach(function() {
      module('app.signup', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state main to url /signup ', function() {
      expect($state.href('signup', {})).to.equal('/signup');
    });

    it('should map /signup route to signup View template', function() {
      expect($state.get('signup').templateUrl).to.equal(view);
    });

    it('of signup should work with $state.go', function() {
      $state.go('signup');
      $rootScope.$apply();
      expect($state.is('signup'));
    });
  });
});
