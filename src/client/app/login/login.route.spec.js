/* jshint -W117, -W030 */
describe('login routes', function() {
  describe('state', function() {
    var view = 'app/login/login.page.html';

    beforeEach(function() {
      module('app.login', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state contact to url /loginpage', function() {
      expect($state.href('loginpage', {})).to.equal('/loginpage');
    });

    it('should map /loginpage route to loginpage View template', function(){
      expect($state.get('loginpage').templateUrl).to.equal(view);
    });

    it('of loginpage should work with $state.go', function() {
      $state.go('loginpage');
      $rootScope.$apply();
      expect($state.is('loginpage'));
    });
  });
});
