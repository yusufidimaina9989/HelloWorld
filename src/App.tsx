import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { ScryptProvider, PandaSigner, DefaultProvider, bsv} from "scrypt-ts";
import { Helloworld } from "./contracts/helloworld";



function App() {

  const interact = async () => {

    try {

      const provider = new DefaultProvider({network : bsv.Networks.testnet})
      const signer = new PandaSigner(provider)

        const { isAuthenticated, error } = await signer.requestAuth();
        if (!isAuthenticated) {
          throw new Error(error);
        }
      const instance = new Helloworld(3n, 4n)
      await instance.connect(signer);
    const deployTx =  await instance.deploy(1)
    
console.log('contract deployed : ', deployTx.id)
      const z = txid.current.value
  
      setTimeout(async () => {
      const { tx: callTx } = await instance.methods.unlock(BigInt(z))
      console.log('Helloworld contract `unlock` called: ', callTx.id)
      alert('contract called : ' + callTx.id)
    }, 5000);
    } catch (e) {
      console.error('deploy HelloWorld fails', e)
      alert('deploy HelloWorld fails')
    }

  };

  const txid = useRef<any>(null);

  return (
    <div className="App">
        <header className="App-header">

        <h2 style={{ fontSize: '34px', paddingBottom: '5px', paddingTop: '5px'}}>integrate Front - End</h2>
  
        <div style={{ textAlign: 'center' }}>
          <h4>3 + 4 = ?, write the answer below</h4>
            <label style={{ fontSize: '14px', paddingBottom: '5px' }}  
                > 
                    <input ref={txid} type="number"   placeholder="sum of two numbers above" />
                </label>     
            </div>
        
        <button onClick={interact}
                style={{ fontSize: '14px', paddingBottom: '2px', marginLeft: '5px'}}
        >Deploy & call</button>
                      
                                
      </header>
    </div>
  );
}

export default App;