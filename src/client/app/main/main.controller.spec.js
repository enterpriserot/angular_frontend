/* jshint -W117, -W030 */
describe('MainController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.main');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('MainController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Main Controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Main', function() {
        expect(controller.title).to.equal('Main');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
