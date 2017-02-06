// (function() {
//     'use strict';
//
//     angular
//         .module('app.recover')
//         .controller('RecoverController', RecoverController);
//
//     RecoverController.$inject = ['dataservice', '$state', 'routerHelper', '$timeout'];
//
//     /* @ngInject */
//     function RecoverController(dataservice, $state, routerHelper, $timeout) {
//         var vm = this;
//
//         vm.signupName = '';
//         vm.signupEmail = '';
//         vm.signupPass = '';
//         vm.signupPass2 = '';
//         vm.sendSignup = sendSignup;
//         vm.user = {};
//
//         function sendSignup(){
//           console.log('sendSignup');
//           if(vm.signupPass2 === vm.signupPass){
//               vm.user = {
//                 'name': vm.signupName,
//                 'email': vm.signupEmail,
//                 'pass': vm.signupPass
//               };
//               var UserJSON = JSON.stringify(vm.user);
//               dataservice.login(UserJSON).then(function(response){
//
//                   if(response[0].email === vm.user.email){
//                     vm.errorMail = 'e-mail is in use in our database';
//                         $timeout(function () {
//                             vm.errorMail = '';
//                         }, 6000);
//                   }else{
//                     console.log('ELSE RESPONSE');
//                   }
//                   console.log(response);
//                   console.log('login');
//               });
//               // dataservice.signup(UserJSON).then(function (response){
//               //     console.log(response);
//               // });
//           }else {
//             console.log('passwords són diferents');
//             vm.message = 'Passwords does not match';
//                 $timeout(function () {
//                     vm.message = '';
//                 }, 6000);
//           }
//         }
//
//         activate();
//
//         function activate() {
//             console.log('signup activate');
//         }
//     }
// })();
