/* jshint -W117, -W030 */
describe('admin routes', function() {
  // var user = { 'id': '343242', 'name': 'User' };
  // var dataservice;
  describe('state', function() {
    var view = 'app/admin/admin.html';
    //INYECTAR EL DATASERVICE Y SIMULAR TRUE O FALSE
    beforeEach(function() {
      module('app.admin', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$q', '$state',
      '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
      // dataservice = {
      //  checkLoggedin: function() {
      //    return $q.when({ 'id': '343242', 'name': 'User' });
      //   }
      // };

    });

    it('should map state admin to url /admin ', function() {
      expect($state.href('admin', {})).to.equal('/admin');
    });

    it('should map /admin route to admin View template', function() {
      expect($state.get('admin').templateUrl).to.equal(view);
    });

    it('of admin should work with $state.go', function() {
      $state.go('admin');
      // sinon.stub(dataservice, 'checkLoggedin').return($q.when(user));
      $rootScope.$apply();
      expect($state.is('admin'));
    });
  });
});
