/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';

const SplashScreen = props => {
  useEffect(() => {
    appInitialCheck();
  }, []);

  const appInitialCheck = () => {
    props.navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Pawang Singa</Text>
        <Text>SplashScreen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = {};
const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
