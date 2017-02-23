/* jshint -W117, -W030 */
describe('LoginPageController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.login');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('LoginPageController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('LoginPage Controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Contact', function() {
        expect(controller.title).to.equal('Login');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
