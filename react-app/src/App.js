import React, { Component } from 'react';
import ipfs from './ipfs';
const ipfsGateway = hasOwnProperty.call(process.env, 'REACT_APP_IPFS_GATEWAY')
                    ? process.env.REACT_APP_IPFS_GATEWAY
                    : 'http://' + window.location.hostname + ':8080/ipfs/';

class App extends Component {

  state = {
    ipfsHash: null,
    buffer: '',
    isSubmit: false,
    isSucceed: false,
    sent: false
  };

  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async (reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer - using es6 syntax
    this.setState({ buffer });
  };


  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isSubmit: true });
    //save document to IPFS,return its hash#, and set hash# to state
    //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      this.setState({ sent: true });
      if (err) {
        console.log(err, ipfsHash);
      } else {
        //setState by setting ipfsHash to ipfsHash[0].hash 
        this.setState({ ipfsHash: ipfsHash[0].hash, isSucceed: true });
      }

    });
  };

  render() {
    return (
      <div>
        <h1> InterPlanetary File System(IPFS) with Create React App</h1>
        <hr />
        <h3> Choose file to send to IPFS </h3>
        <form onSubmit={this.onSubmit}>
          <input
            type="file"
            onChange={this.captureFile}
          />
          <button
            type="submit"
            disabled={this.state.isSubmit}>
            Send to IPFS
             </button>
        </form>
        <p>
          {(this.state.isSubmit === true && this.state.sent === false) &&
            <i>File is sending...</i>
          }
        </p>
        <hr />
        {this.state.sent === true &&
          <h4>
            {this.state.isSucceed === true ?
              <b>
                File sent:
                <a href={ipfsGateway + this.state.ipfsHash}>
                  {this.state.ipfsHash}
                </a>
              </b> :
              <b>File is sent error</b>
            }
          </h4>
        }
      </div>
    );
  } //render
}

export default App;
