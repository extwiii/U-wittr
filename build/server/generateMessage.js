'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.generateMessage = generateMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _markov = require('markov');

var _markov2 = _interopRequireDefault(_markov);

var _lodashNumberRandom = require('lodash/number/random');

var _lodashNumberRandom2 = _interopRequireDefault(_lodashNumberRandom);

var _photos = require('./photos');

var _photos2 = _interopRequireDefault(_photos);

// names generated by chance.js
var users = [{ avatar: "marc", name: "Marc Stone" }, { avatar: "ellen", name: "Ellen Clayton" }, { avatar: "ruth", name: "Ruth Maxwell" }, { avatar: "ray", name: "Ray Scott" }, { avatar: "sam", name: "Sam Munoz" }, { avatar: "craig", name: "Craig Robbins" }, { avatar: "lillie", name: "Lillie Wolfe" }, { avatar: "susan", name: "Susan Keller" }];

var markov = (0, _markov2['default'])(3);
var generateReady = new Promise(function (resolve) {
  markov.seed(_fs2['default'].createReadStream(__dirname + '/seed.txt'), resolve);
});

exports.generateReady = generateReady;

function generateMessage() {
  var message = {};
  var user = users[Math.floor(Math.random() * users.length)];
  var image = undefined;

  if (Math.random() < 0.2) {
    image = _photos2['default'][Math.floor(Math.random() * _photos2['default'].length)];
  }

  message.id = Number(String((0, _lodashNumberRandom2['default'])(1, 10000)) + Date.now()).toString(36);
  message.avatar = '/avatars/' + user.avatar;
  message.name = user.name;
  message.time = new Date().toISOString();
  message.body = markov.fill(markov.pick(), (0, _lodashNumberRandom2['default'])(3, 15)).join(' ');

  if (image) {
    message.photo = '/photos/' + image.farm + '-' + image.server + '-' + image.id + '-' + image.secret;
  }

  return message;
}
//# sourceMappingURL=generateMessage.js.map
