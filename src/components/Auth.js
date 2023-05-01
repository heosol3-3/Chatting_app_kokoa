import { authService } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';

function Auth() {
  <div>
    
  </div>
  // const [newAccount, setNewAccount] = useState(false); 

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     let data;
  //     if (newAccount) { // create account
  //       data = await createUserWithEmailAndPassword(authService, email, password);}
  //     else { // log in
  //       data = await signInWithEmailAndPassword(authService, email, password);
  //     }
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // return <>...</>;
}

export default Auth;