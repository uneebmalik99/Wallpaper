import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';
import {color} from 'react-native-reanimated';
import AppConstance, {
  deviceHeight,
  deviceWidth,
} from '../constance/AppConstance';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';

const TestContainer = ({navigation, route}) => {
  _callback = res => {
    alert(res.msg);
  };

  const {item} = route.params;

  _setWallpaper = () => {
    ManageWallpaper.setWallpaper(
      {
        uri: item,
      },
      _callback,
      TYPE.HOME,
    );
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <View style={styles.imgcontainer}>
        <ImageBackground source={{uri: item}} style={styles.image} resizeMode= 'stretch'>
          <View style={styles.check}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ScreenList')}
              style={styles.opacity}>
              <Text style={styles.text}>ScreenList</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_setWallpaper} style={styles.opacity}>
              <Text style={styles.text}>SetWallpaper</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('test')}
              style={styles.opacity}>
              <Text style={styles.text}>test</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('download', {item: route.params.item})
              }
              style={styles.opacity}>
              <Text style={styles.text}>download</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  opacity: {
    width: 150,
    height: 35,
    // opacity: 0,
    borderRadius: 100,
    marginBottom: 24,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'verdana',
    fontSize: 20,
    color: 'white',
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
    height: '100%',
    justifyContent: 'flex-end',
    marginBottom: 55,
    alignItems: 'center',
  },
  maincontainer: {
    width: deviceWidth,
    height: deviceHeight,
  },
});
export default TestContainer;
