/* jshint -W117, -W030 */
describe('SignupController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.signup');
    bard.inject('$controller', '$log', '$rootScope', '$q');
  });

  beforeEach(function() {
    ds = {
      signup: function(data) {
        return $q.when(true);
      }
    };
    controller = $controller('SignupController', { dataservice: ds });
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Signup Controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Contact', function() {
        expect(controller.title).to.equal('Signup');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('function sendSignup should be defined', function () {
        expect(controller.sendSignup).to.be.defined;
      });
    });

    describe('sendSignup funcionality', function() {
      it('error message is shown when passwords dont match', function() {
        controller.signupPass = 'Test';
        controller.signupPass2 = 'Test2';
        controller.sendSignup();
        $rootScope.$apply();
        expect(controller.message).to.equal('Passwords does not match');
      });

      it('error message is shown when user exists on database', function() {
        var res = { data : 'name' };
        ds = {
          signup : function(data) {
            return $q.when(res);
          }
        };
        var controller = $controller('SignupController', { dataservice : ds });
        controller.sendSignup();
        $rootScope.$apply();
        expect(controller.errorMail).to.equal('email is in use in our database');
      });

      it('error message is shown when server returns error', function() {
        var res = { data : 'err' };
        ds = {
          signup : function(data) {
            return $q.when(res);
          }
        };
        var controller = $controller('SignupController', { dataservice : ds });
        controller.sendSignup();
        $rootScope.$apply();
        expect(controller.resultmessage).to.equal('Server error, please try it later');
      });

      it('When signup process work well result message is shown', function() {
        var res = true;
        ds = {
          signup : function(data) {
            return $q.when(res);
          }
        };
        var controller = $controller('SignupController', { dataservice : ds });
        controller.sendSignup();
        $rootScope.$apply();
        expect(controller.resultmessage).to.equal('User created successfull');
      });
    });
  });
});
