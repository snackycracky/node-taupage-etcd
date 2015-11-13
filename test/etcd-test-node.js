import { expect } from 'chai';
import {findInternalDns} from '../src/etcd';
var testData = require('./etcd-test-taupage-repsonse.json');

describe('findInternalDns', () => {
  it('should find the internal dns', () => {
    const dns = findInternalDns(testData, "app-backend");
    expect(dns).to.equal("ip-172-31-174-68.eu-west-1.compute.internal");
  });

  it('should return null if not found', () => {
    const dns = findInternalDns(testData, "not-existing-applicaiton_id");
    expect(dns).to.be.null;
  });

  it('should return null if nothing is in the nodes', () => {
    const dns = findInternalDns({"node": {"nodes": []}}, "not-existing-applicaiton_id");
    expect(dns).to.be.null;
  });

  it('should return null if the config is undefined', () => {
    const dns = findInternalDns(undefined, "not-existing-applicaiton_id");
    expect(dns).to.be.null;
  });
});