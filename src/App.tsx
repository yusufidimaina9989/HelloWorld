import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import { PandaSigner, DefaultProvider, bsv} from "scrypt-ts";
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
      const z = sum.current.value
  
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

  const sum = useRef<any>(null);

  return (
    <div className="App">
        <header className="App-header">

        <h2 >integrate Front - End</h2>
  
        <div>
          <h4>3 + 4 = ?, write the answer below</h4>
            <label> 
                    <input ref={sum} type="number"   placeholder="sum of two numbers above" />
                </label>     
            </div>
            <br/>
        
        <button onClick={interact}>Deploy & call</button>
                      
                                
      </header>
    </div>
  );
}

export default App;
