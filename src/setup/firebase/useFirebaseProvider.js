import { useContext } from 'react';
import { FirebaseContext } from './FirebaseProvider';

export default function useFirebaseProvider() {
  return useContext(FirebaseContext);
}
