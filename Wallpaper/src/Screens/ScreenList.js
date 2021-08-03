import React from 'react';
import {useState, useEffect} from 'react';

import admob, {
  FirebaseAdMobTypes,
  MaxAdContentRating,
  AdEventType,
  BannerAd,
  TestIds,
  BannerAdSize,
  InterstitialAd,
} from '@react-native-firebase/admob';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  // FlatList,
  View,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Image} from 'react-native';
import {color} from 'react-native-reanimated';
import AppConstance, {
  deviceHeight,
  deviceWidth,
} from '../constance/AppConstance';
import {FlatList} from 'react-native-gesture-handler';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

const ScreenList = ({navigation}) => {
  const [loaded, setloaded] = useState(false);
  const [data, setData] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch('https://awanwoodworkshop.store/react_API/api/AllGallery').then(
      // fetch('https://awanwoodworkshop.store/react_API/api/gallery').then(
      (res) => {
        res.json().then((resp) => {
          console.log('result', resp);
          setGallery(resp.gallery);
          // console.log(resp.gallery[0]);
          setData(resp);
        });
      },
    );

      const eventListener = interstitial.onAdEvent(type => {
        if (type === AdEventType.LOADED) {
          setloaded(true);
        }
      });
      interstitial.load();
      return () => {
        eventListener();
      };
  }, []);
  // if (!loaded) {
  //   return null;
  // }
  const [images, setimages] = useState([
    {
      id: 0,
      img: {uri: 'https://source.unsplash.com/1024x768/?nature'},
      text: 'Nature ',
    },
    {
      id: 1,
      img: {uri: 'https://source.unsplash.com/1024x768/?water'},
      text: 'Water ',
    },
    {
      id: 2,
      img: {uri: 'https://source.unsplash.com/1024x768/?tree'},
      text: 'Trees ',
    },
    {
      id: 3,
      img: {uri: 'https://source.unsplash.com/1024x768/?girl'},
      text: 'Girl ',
    },
    {
      id: 4,
      img: {uri: 'https://source.unsplash.com/1024x768/?nature'},
      text: 'Nature ',
    },
    {
      id: 5,
      img: {uri: 'https://source.unsplash.com/1024x768/?water'},
      text: 'Water ',
    },
    {
      id: 6,
      img: {uri: 'https://source.unsplash.com/1024x768/?tree'},
      text: 'Trees ',
    },
    {
      id: 7,
      img: {uri: 'https://source.unsplash.com/1024x768/?girl'},
      text: 'Girl ',
    },
    {
      id: 8,
      img: {uri: 'https://source.unsplash.com/1024x768/?nature'},
      text: 'Nature ',
    },
    {
      id: 9,
      img: {uri: 'https://source.unsplash.com/1024x768/?water'},
      text: 'Water ',
    },
    {
      id: 10,
      img: {uri: 'https://source.unsplash.com/1024x768/?tree'},
      text: 'Trees ',
    },
    {
      id: 11,
      img: {uri: 'https://source.unsplash.com/1024x768/?girl'},
      text: 'Girl ',
    },
  ]);

  const renderlist = ({item}) => {
    console.log(item.gallery[0].image);
    return (
      <View>
        {/* <Text>{item.id}</Text>
        <Text>{item.gallery[0].image}</Text> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('test', {
              item: item.cat_name,
              url: item.gallery[0].image,
            });
          }}
          style={styles.body}>
          <ImageBackground
            source={{uri: item.gallery[0].image}}
            style={styles.image}
            resizeMode="stretch">
            <Text style={styles.text}>{item.cat_name}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Button
        title="Show interstitial ad"
        onPress={() => {
          interstitial.show();
        }}
      />
      <FlatList
        // horizontal={true}
        // showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderlist}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    // fontFamily: 'verdana',
    fontSize: 35,
    textDecorationLine: 'underline',
    color: 'teal',
  },
  imgcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maincontainer: {
    width: deviceWidth,
    height: deviceHeight,
  },
});
export default ScreenList;
