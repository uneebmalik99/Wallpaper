import React, {useState, useRef, useEffect} from 'react';
// import { NativeModules } from 'react-native';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Share,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import admob, {
  FirebaseAdMobTypes,
  MaxAdContentRating,
  AdEventType,
  BannerAd,
  TestIds,
  BannerAdSize,
  InterstitialAd,
} from '@react-native-firebase/admob';
import Snackbar from 'react-native-snackbar';
import BottomSheet from 'reanimated-bottom-sheet';
import AppConstance, {
  deviceHeight,
  deviceWidth,
} from '../constance/AppConstance';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import RBSheet from 'react-native-raw-bottom-sheet';

// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

const TestContainer = ({navigation, route}) => {
  const refRBSheet = useRef();
  const REMOTE_IMAGE_PATH = route.params.item;
  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    admob()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,
        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {});
    const eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        setloaded(true);
        // interstitial.show();
      }
    });
    interstitial.load();

    return () => {
      eventListener();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        url: REMOTE_IMAGE_PATH,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  const downloadImage = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        refRBSheet.current.close();
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));

        Snackbar.show({
          text: 'Image Downloaded Successfully.',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };
  const getExtention = (filename) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  _callback = (res) => {
    alert(res.msg);
  };

  const {item} = route.params;

  _setWallpaper = () => {
    ManageWallpaper.setWallpaper(
      {
        source: item,
      },
      _callback,
      TYPE.HOME,
    );
  };
  AdShare = () => {
    // refRBSheet.current.close()
    if (loaded == true) {
      interstitial.show();
    }
    // onShare();
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Appbar.Header
        style={{
          elevation: 0,
          backgroundColor: '#eaecee',
          paddingHorizontal: 5,
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: deviceWidth,
          height: deviceHeight * 0.05,
        }}>
        <View style={{width: '20%'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backbtn}>
            <Ionicon
              name="chevron-back"
              size={25}
              style={{color: 'black'}}></Ionicon>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '60%',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>Image</Text>
        </View>

        <View style={{width: '20%'}}></View>
      </Appbar.Header>

      <View style={styles.imgcontainer}>
        <ImageBackground
          source={{uri: item}}
          style={styles.image}
          resizeMode="stretch">
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.touchableOpacity}>
            <Ionicon name="chevron-up" size={30} style={{color: 'white'}}>
              {/* <Text style={styles.text}> Options</Text> */}
            </Ionicon>
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity
          //   onPress={() => {
          //     // interstitial.show();
          //   }
          //   // , onShare
          // }
          onPress={AdShare}
          style={styles.opacity}>
          <Ionicon name="share-outline" size={20} style={{color: '#03a9fc'}}>
            <Text style={styles.text}>
              {'    '}AdTest{'     '}
            </Text>
          </Ionicon>
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        animationType="slide"
        closeOnPressMask={true}
        openDuration={250}
        closeDuration={0}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: deviceHeight * 0.38,
            paddingTop: 15,
          },
          draggableIcon: {
            backgroundColor: '#292F58',
          },
        }}>
        <View
          style={{
            backgroundColor: '#fff',

            height: 350,
            width: '100%',
            // alignItems: 'center',
            // justifyContent: 'space-between',
            marginEnd: 30,
          }}>
          <TouchableOpacity
            onPress={_setWallpaper}
            style={[styles.opacity, {marginTop: 10}]}>
            <Icon name="image" size={20} style={{color: 'orange'}}>
              <Text style={styles.text}>{'    '}Wallpaper</Text>
            </Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              // await
              //  refRBSheet.current.close();
              interstitial.show();
            }}
            style={styles.opacity}>
            <Ionicon name="share-outline" size={20} style={{color: '#03a9fc'}}>
              <Text style={styles.text}>
                {'    '}Share{'     '}
              </Text>
            </Ionicon>
          </TouchableOpacity>
          <TouchableOpacity onPress={checkPermission} style={styles.opacity}>
            <Icon name="download" size={20} style={{color: 'purple'}}>
              <Text style={styles.text}>{'    '}Download</Text>
            </Icon>
          </TouchableOpacity>

          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}>
            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={styles.touchableOpacity}>
              <Ionicon
                name="chevron-down"
                size={30}
                style={{color: 'white', alignSelf: 'center'}}></Ionicon>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  touchableOpacity: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginBottom: 40,
    backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacity: {
    width: '90%',
    height: deviceHeight * 0.07,
    // borderRadius: 10,
    marginTop: 15,
    borderRadius: 15,
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: 'verdana',
    fontSize: 20,
    color: 'black',
  },
  imgcontainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: deviceHeight * 0.9007,
    justifyContent: 'flex-end',
    // marginBottom: 55,
    alignItems: 'center',
  },
  maincontainer: {
    width: deviceWidth,
    height: deviceHeight,
    marginTop: 38.8,
  },
});
export default TestContainer;
