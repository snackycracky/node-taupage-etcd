finds the internal dns for the required server.

This lib makes sense if you use https://stups.io/ and etcd (https://github.com/zalando/stups-etcd-cluster).


## Install

```javascript
npm install node-taupage-etcd --save

import getAPIHost from 'node-taupage-etcd'

getAPIHost(process.env.ETCD_URL, "application_id")
```
 