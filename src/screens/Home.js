import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Touchable,
  Switch,
} from 'react-native';
import {connect} from 'react-redux';

import {getRestaurants, getRandom} from '../services/RestaurantService'


const Home = props => {
  const homeText = {
    title: 'Let`s Eat',
    subtitle: 'Whats to eat today ?',
    hero: [
      'Have no idea about what to eat?',
      'Get random recomendation right now',
      'Klik here',
    ],
  };
  const [resData, setResData] = useState(null);
  const [randomRes, setRandomRes] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const restaurants = await getRestaurants()
      const random = await getRandom()
      setResData(restaurants)
      setRandomRes(random)
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
        {/* {renderNewContent()} */}
        {randomRes && renderRecomended()}
        {/* {renderUserFavourite()} */}
        {resData && renderRestaurant()}
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
        <Text>{randomRes?.Name}</Text>
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
  const renderRestaurant = () => {
    return (
      <View>
        {
          resData?.map(el => {
            return <View style={{
              marginVertical: 8,
              backgroundColor: "white",
              padding: 4
            }} key={el._id}>
              {/* <Text>{JSON.stringify(Object.keys(el))}</Text> */}
              <Text>{el.Name}</Text>
              <Text>{el.Address}</Text>
            </View>
          })
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SafeAreaView forceInset={{top: 'always'}} />
      <ScrollView>
        {renderHeader()}
        {renderHero()}
        {renderContent()}
      </ScrollView>
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
