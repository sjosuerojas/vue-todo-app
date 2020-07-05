import firebase from 'firebase/app';
import 'firebase/firestore';
import { config } from '@/config/env.config';

const firebaseConfig = {
  apiKey: config.fire_apiKey,
  authDomain: config.fire_authDomain,
  databaseURL: config.fire_databaseURL,
  projectId: config.fire_projectId,
  storageBucket: config.fire_storageBucket,
  messagingSenderId: config.fire_messagingSenderId,
  appId: config.fire_appId,
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
