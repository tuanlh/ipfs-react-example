//using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
const IPFS = require('ipfs-http-client');
const ipfsHost = hasOwnProperty.call(process.env, 'REACT_APP_IPFS_HOST')
                ? process.env.REACT_APP_IPFS_HOST
                : window.location.hostname;
const ipfs = new IPFS({ host: ipfsHost, port: 5001, protocol: 'http' });

//run with local daemon
// const ipfsApi = require('ipfs-api');
// const ipfs = new ipfsApi('localhost', '5001', {protocol: 'http'});

export default ipfs; 
