'use strict';

describe('Service: Filter', function () {

  // load the service's module
  beforeEach(module('yoAngApp'));

  // instantiate service
  var Filter;
  beforeEach(inject(function (_Filter_) {
    Filter = _Filter_;
  }));

  it('should do something', function () {
    expect(!!Filter).toBe(true);
  });

});
