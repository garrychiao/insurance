import { createContext } from 'react';
import firebaseSetup from './firebaseSetup';

export const FirebaseContext = createContext(null);

export default function FirebaseProvider({children}) {
  
  const { db } = firebaseSetup();

  return (
    <FirebaseContext.Provider value={{db}}>
      {children}
    </FirebaseContext.Provider>
  );
}
