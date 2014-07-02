'use strict';

describe('Directive: mediaObject', function () {

  // load the directive's module
  beforeEach(module('yoAngApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<media-object></media-object>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mediaObject directive');
  }));
});
