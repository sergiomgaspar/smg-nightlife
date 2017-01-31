'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var searchCtrlStub = {
  index: 'searchCtrl.index',
  show: 'searchCtrl.show',
  create: 'searchCtrl.create',
  upsert: 'searchCtrl.upsert',
  patch: 'searchCtrl.patch',
  destroy: 'searchCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var searchIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './search.controller': searchCtrlStub
});

describe('Search API Router:', function() {
  it('should return an express router instance', function() {
    expect(searchIndex).to.equal(routerStub);
  });

  describe('GET /api/search', function() {
    it('should route to search.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'searchCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/search/:id', function() {
    it('should route to search.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'searchCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/search', function() {
    it('should route to search.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'searchCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/search/:id', function() {
    it('should route to search.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'searchCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/search/:id', function() {
    it('should route to search.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'searchCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/search/:id', function() {
    it('should route to search.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'searchCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
