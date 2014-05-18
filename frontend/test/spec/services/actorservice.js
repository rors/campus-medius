'use strict';

describe('Service: Actorservice', function () {

  // load the service's module
  beforeEach(module('yoAngApp'));

  // instantiate service
  var Actorservice;
  beforeEach(inject(function (_Actorservice_) {
    Actorservice = _Actorservice_;
  }));

  it('should do something', function () {
    expect(!!Actorservice).toBe(true);
  });

});
