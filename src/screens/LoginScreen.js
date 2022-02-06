import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';

import {readDB, writeFSDB} from '../config/firebaseConfig';

const Home = props => {
  useEffect(() => {
    readDB();
    writeFSDB();
  }, []);
  return (
    <View>
      <Text>{props.appsTitle}</Text>
      <Text>this is home screen</Text>
      <Button title="to Login" onPress={() => props.navigation.push('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({});

const mapDispatchToProps = {};
const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
