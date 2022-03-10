import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Touchable,
  Switch,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import {readDB, writeFSDB, readFSDB} from '../config/firebaseConfig';

const Home = props => {
  const [homeText, setHomeText] = useState({
    title: 'Let`s Eat',
    subtitle: 'Whats to eat today ?',
    hero: [
      'Have no idea about what to eat?',
      'Get random recomendation right now',
      'Klik here',
    ],
  });
  const [fetchedData, setFetchData] = useState({});

  useEffect(() => {
    // readDB();
    // writeFSDB();
    readFSDB('Users');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderHero = () => {
    return (
      <View style={styles.heroHeader}>
        {homeText.hero.map((text, idx) => {
          const customStyles = {
            marginTop: idx + 1 === homeText.hero.length ? 12 : 0,
          };
          return (
            <Text style={[styles.textHero, customStyles]} key={idx + text}>
              {text}
            </Text>
          );
        })}
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <View style={styles.homeHeader}>
        <Text style={styles.textTitle}>{homeText.title}</Text>
        <Text style={styles.textSubtitle}>{homeText.subtitle}</Text>
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View>
        {renderNewContent()}
        {renderRecomended()}
        {renderUserFavourite()}
      </View>
    );
  };
  const renderNewContent = () => {
    return (
      <View style={styles.newContent}>
        <Text>Newly added</Text>
      </View>
    );
  };
  const renderRecomended = () => {
    return (
      <View style={styles.recommended}>
        <Text>Recommended</Text>
      </View>
    );
  };
  const renderUserFavourite = () => {
    return (
      <View style={styles.userFavourite}>
        <Text>Users choice</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView forceInset={{top: 'always'}} />
      {renderHeader()}
      {renderHero()}
      {renderContent()}
      <Pressable
        onPress={() => console.log('hellow orls')}
        onLongPress={() => console.log('lama banget kak mencetnya')}>
        <Text>pencet aku</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    paddingHorizontal: 8,
  },
  heroHeader: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 8,
    marginVertical: 12,
    alignItems: 'center',
  },
  homeHeader: {
    backgroundColor: 'skyblue',
    marginTop: 24,
  },
  newContent: {
    backgroundColor: 'yellow',
  },
  recommended: {
    backgroundColor: 'green',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textSubtitle: {
    fontSize: 12,
  },
  textHero: {
    fontSize: 14,
    fontWeight: '600',
  },
  userFavourite: {
    backgroundColor: 'red',
  },
});

const mapDispatchToProps = {};
const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
