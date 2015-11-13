"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getAPIHost;
exports.findInternalDns = findInternalDns;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _nodeEtcd = require('node-etcd');

var _nodeEtcd2 = _interopRequireDefault(_nodeEtcd);

function getAPIHost(etcd_url, application_id) {
    if (etcd_url && application_id) {
        var matchedTokens = etcd_url.match(/http:\/\/(.*?):(.*)/);
        var etcd = new _nodeEtcd2["default"](matchedTokens[1], matchedTokens[2]);
        var taupageConfig = etcd.get("taupage", { synchronous: true }).body;
        return this.findInternalDns(taupageConfig, application_id);
    } else {
        return null;
    }
}

function findInternalDns() {
    var taupageConfig = arguments.length <= 0 || arguments[0] === undefined ? { node: { nodes: [] } } : arguments[0];
    var app_id = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

    var availableNodes = taupageConfig.node.nodes;

    var allNodeValues = availableNodes.map(function (n) {
        return {
            dns: n.key.split("/").pop(),
            applicationId: JSON.parse(n.value).application_id
        };
    });

    var _ref = allNodeValues.find(function (o) {
        return o.applicationId === app_id;
    }) || {};

    var _ref$dns = _ref.dns;
    var dns = _ref$dns === undefined ? null : _ref$dns;

    return dns;
}