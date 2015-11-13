import Etcd from 'node-etcd';

export default function getAPIHost(etcd_url, application_id) {
    if (etcd_url && application_id) {
        const matchedTokens = etcd_url.match(/http:\/\/(.*?):(.*)/);
        const etcd = new Etcd(matchedTokens[1], matchedTokens[2]);
        const taupageConfig = etcd.get("taupage", {synchronous: true}).body;
        return this.findInternalDns(taupageConfig, application_id);
    } else {
        return null
    }
}

export function findInternalDns(taupageConfig = {node: {nodes: []}}, app_id = "") {
    const availableNodes = taupageConfig.node.nodes;

    const allNodeValues = availableNodes.map(n => {
        return {
            dns: n.key.split("/").pop(),
            applicationId: JSON.parse(n.value).application_id
        }
    });

    const {dns = null} = allNodeValues.find(o => o.applicationId === app_id) || {};

    return dns
}
