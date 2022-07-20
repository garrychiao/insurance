import { createContext, useMemo } from 'react';
import firebaseSetup from './firebaseSetup';

export const FirebaseContext = createContext(null);

export default function FirebaseProvider({children}) {
  
  const { db } = useMemo(
    () => firebaseSetup(),
    [firebaseSetup]
  );

  return (
    <FirebaseContext.Provider value={{db}}>
      {children}
    </FirebaseContext.Provider>
  );
}
