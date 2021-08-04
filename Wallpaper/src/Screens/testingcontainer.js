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

import BottomSheet from 'reanimated-bottom-sheet';
import AppConstance, {
  deviceHeight,
  deviceWidth,
} from '../constance/AppConstance';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const TestContainer = ({navigation, route}) => {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 16,
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ScreenList')}
        style={styles.opacity}>
        <Icon name="home" size={20} style={styles.text}>
          <Text> ScreenList</Text>
        </Icon>
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
        <Icon name="download" size={20} style={styles.text}>
          <Text> download</Text>
        </Icon>
      </TouchableOpacity>

      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef(null);

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
      <Appbar.Header
          style={{
            elevation: 0,
            backgroundColor: '#eaecee',
            paddingHorizontal: 5,
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: deviceWidth,
          }}></Appbar.Header>

      <View style={styles.imgcontainer}>
        <ImageBackground source={{uri: item}} style={styles.image} resizeMode= 'stretch'>
        <TouchableOpacity
              onPress={() => sheetRef.current.snapTo(0)}
              style={styles.touchableOpacity}>
              <Text style={styles.text}>Open Bottom Sheet</Text>
              </TouchableOpacity>
        </ImageBackground>
      </View>
      <BottomSheet
          ref={sheetRef}
          snapPoints={[400, 200, 10]}
          style={{
            width: deviceWidth,
            height: deviceHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          borderRadius={20}
          renderContent={renderContent}
        />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  touchableOpacity: {
    width: 250,
    height: 35,
    borderRadius: 100,
    marginBottom: 55,
    backgroundColor: '#31b048',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
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
