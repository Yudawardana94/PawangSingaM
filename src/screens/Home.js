import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Touchable,
  Switch,
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/FontAwesome'

import { colors } from '../config/globalValue'
import { getRestaurants, getRandom } from '../services/RestaurantService'
import Restaurants from '../components/Lists/RestaurantList'
import RecomendationCard from '../components/Cards/RecomendationCard'


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
  const defaultImage = "https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038?k=20&m=900816038&s=612x612&w=0&h=PYTP1QdLaw2YuvrKZVe8nGgek6wa0CmYN4bRqjhYr8E="
  const [resData, setResData] = useState(null);
  const [randomRes, setRandomRes] = useState(null);
  const [isWL, setWL] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // FUNCTION SECTION

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

  const onNavigateScreen = (screenNavigate, data) => {
    props.navigation.navigate(screenNavigate, data)
  }

  // RENDER SECTIONS
  // TODO: SEPARATE THIS RENDER SECTION TO SMALLER COMPONENT

  const HeroSection = () => {
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
  const HeaderSection = () => {
    return (
      <View style={styles.homeHeader}>
        <Text style={styles.textTitle}>{homeText.title}</Text>
        <Text style={styles.textSubtitle}>{homeText.subtitle}</Text>
      </View>
    );
  };
  const MainContentPage = () => {
    return (
      <View>
        <MainMenu />
        {/* {<MyWishlist />} */}
        {randomRes && <RecomendationCard data={randomRes} navigation={props.navigation} />}
        {/* {<Favourite />} */}
        {resData && <Restaurants data={resData} navigation={props.navigation} />}
      </View>
    );
  };
  const MainMenu = () => {
    const menu = [{
      title: "Random",
      screenName: "Random",
      icon: "random",
      screenProps: {},

    }, {
      title: "Restaurants",
      screenName: "Restaurants",
      icon: "building",
      screenProps: {}
    }, {
      title: "Wishlist",
      screenName: "Wishlist",
      icon: "heart",
      screenProps: {}
    }, {
      title: "Search",
      screenName: "Search",
      icon: "search",
      screenProps: {}
    },]
    return <View style={{
      flexDirection: 'row',
      marginTop: 12,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3
    }}>
      {
        menu.map(menu => {
          return <Pressable style={{
            marginRight: 8,
            borderRadius: 6,
            padding: 6,
            width: "20%",
            alignItems: 'center'
          }}
            onPress={() => onNavigateScreen(menu.screenName, menu.screenProps)}
            key={Math.random()}
            hitSlop={{
              top: 8,
              bottom: 8,
              left: 8,
              right: 8
            }}>
            <Icon name={menu.icon} size={30} style={{
              marginBottom: 8,
            }} />
            <Text style={{
              textAlign: 'center',
              flexGrow: 1,
              fontSize: 11,
            }}>{menu.title}</Text>
          </Pressable>
        })
      }
    </View>
  }
  const MyWishlist = () => {
    return (
      <View style={{
        // flex: 1,
      }}>
        <Text style={{
          marginBottom: 12,
        }}>My Wishlist</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} howirzonstyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          flexGrow: 1,
          flex: 1,
        }}>
          {
            resData?.map(wl => {
              return <Pressable
                style={{
                  backgroundColor: colors.card,
                  marginRight: 8,
                  borderRadius: 4,
                  width: 125
                }}
                key={Math.random()}
                onPress={() => {
                  console.log({ ...wl, Photos: [...wl.Photos, defaultImage] })
                  // props.navigation.navigate("DetailRestaurant", wl) // this is the main used data
                  props.navigation.navigate("DetailRestaurant", { ...wl, Photos: [...wl.Photos, defaultImage] }) //this is customized data
                }}
              >
                <FastImage
                  style={{
                    width: 125,
                    height: 75,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                    justifyContent: 'flex-end',
                  }}
                  source={{
                    uri: defaultImage,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={{
                  padding: 4,
                  fontSize: 12,
                  fontWeight: "bold",
                  textTransform: 'capitalize'
                }}>{wl.Name}</Text>
              </Pressable>
            })
          }
        </ScrollView>
      </View>
    )
  }
  const Favourite = () => {
    return (
      <View style={styles.userFavourite}>
        <Text>Users choice</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView forceInset={{ top: 'always' }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderSection />
        {/* <HeroSection /> */}
        <MainContentPage />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    paddingHorizontal: 8,
  },
  heroHeader: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  homeHeader: {
    marginVertical: 12,
  },
  newContent: {
    backgroundColor: 'yellow',
  },
  //Recomendation Section 
  recommended: {
    backgroundColor: colors.card,
    borderRadius: 4,
    minHeight: 50,
    padding: 8,
    marginVertical: 8,
  },
  recTitle: {
    marginBottom: 6,
    textAlign: 'center'
  },
  // Recomendation Content
  recContentWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  recContentText: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1
  },
  randomResType: {
    textTransform: "capitalize",
    padding: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
    marginRight: 4,
    marginTop: 4,
    backgroundColor: "lightgray",
  },
  reccomendationImage: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: "lightgrey",
    marginRight: 12
  },
  typeWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
