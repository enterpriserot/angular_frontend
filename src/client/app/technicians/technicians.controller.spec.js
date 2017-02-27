/* jshint -W117, -W030 */
describe('techniciansController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.technicians');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    scope = $rootScope.$new();
    controller = $controller('techniciansController', {$scope: scope});


    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Technicians Controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Technicians', function() {
        expect(controller.title).to.equal('Technicians');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('controler.map (Google maps API) should be created successfully', function() {
        expect(controller.map).to.be.defined;
      });
    });
  });
});
