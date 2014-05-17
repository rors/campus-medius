'use strict';

describe('Service: Timeline', function () {

  // load the service's module
  beforeEach(module('yoAngApp'));

  // instantiate service
  var Timeline;
  beforeEach(inject(function (_Timeline_) {
    Timeline = _Timeline_;
  }));

  it('should do something', function () {
    expect(!!Timeline).toBe(true);
  });

});
