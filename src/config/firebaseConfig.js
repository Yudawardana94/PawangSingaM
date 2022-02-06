import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const defaultDB = 'https://ohmyproject-2020.firebaseio.com/';

export const readDB = param => {
  console.log(param, 'ini param');
  firebase
    .app()
    .database()
    .ref('/userData/00')
    .once('value', snapshot => console.log(snapshot, ' ini snapshot'))
    .catch(error => console.log(error, 'ini error'));
};

export const readFSDB = async param => {
  console.log(param, 'ini paramnya');
  try {
    const restaurant = await firestore().collection(param).get();
    // console.log(restaurant._docs);
    return restaurant._docs;
  } catch (error) {
    console.log(error, 'ada error disini');
  }
};

export const writeFSDB = param => {
  console.log(param, 'ini paramnya');
  firestore()
    .collection('Users')
    .add({
      name: 'Ada Lovelace',
      age: 30,
      email: 'adalov@mail.com',
    })
    .then(() => {
      console.log('User added!');
    });
};
