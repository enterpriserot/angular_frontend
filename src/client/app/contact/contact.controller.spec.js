/* jshint -W117, -W030 */
describe('ContactController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.contact');
    bard.inject('$q', '$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    ds = {
        sendEmail: function(data) {
          return $q.when(true);
        }
    };
    controller = $controller('ContactController', {dataservice: ds});
    $rootScope.$apply();
  });

  // bard.verifyNoOutstandingHttpRequests();

  describe('Contact Controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    it('function SubmitContact should be defined', function() {
      expect(controller.SubmitContact).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Contact', function() {
        expect(controller.title).to.equal('Contact');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });

    describe('SubmitContact funcionality', function() {
      it('email message should be shown correctly', function() {
        controller.SubmitContact();
        $rootScope.$apply();
        expect(controller.resultMessageOk).to.equal('Email sent correctly!');
      });

      it('when something fails error is shown', function() {
        ds = {
          sendEmail : function(data) {
            return $q.when(false);
          }
        };
        var controller = $controller('ContactController', {
          dataservice: ds
        });
        controller.SubmitContact();
        $rootScope.$apply();
        expect(controller.resultMessage)
        .to.equal('Problem sending your email, please try again later!');

        });
    });
  });
});
