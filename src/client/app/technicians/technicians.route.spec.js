/* jshint -W117, -W030 */
describe('technicians routes', function() {
  describe('state', function() {
    var view = 'app/technicians/technicians.html';

    beforeEach(function() {
      module('app.technicians', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state technicians to url /technicians ', function() {
      expect($state.href('technicians', {})).to.equal('/technicians');
    });

    it('should map /technicians route to technicians View template', function() {
      expect($state.get('technicians').templateUrl).to.equal(view);
    });

    it('of technicians should work with $state.go', function() {
      $state.go('technicians');
      $rootScope.$apply();
      expect($state.is('technicians'));
    });
  });
});
