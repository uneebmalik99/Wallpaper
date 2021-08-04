import React from 'react';
import {useMemo, useState} from 'react';
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
  // const snapPoints = useMemo(() => [100, 200], []);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 16,
        height: 350,
        width: '100%',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        marginEnd: 30,
      }}>
      <TouchableOpacity onPress={_setWallpaper} style={styles.opacity}>
        <Icon name="image" size={20} style={{color: 'orange'}}>
          <Text style={styles.text}>{'    '}Wallpaper</Text>
        </Icon>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('download', {item: route.params.item})
        }
        style={styles.opacity}>
        <Icon name="download" size={20} style={{color: 'purple'}}>
          <Text style={styles.text}>{'    '}Download</Text>
        </Icon>
      </TouchableOpacity>
    </View>
  );

  const sheetRef = React.useRef(null);

  _callback = (res) => {
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
        <ImageBackground
          source={{uri: item}}
          style={styles.image}
          resizeMode="stretch">
          <TouchableOpacity
            onPress={() => sheetRef.current.snapTo(0)}
            style={styles.touchableOpacity}>
            <Icon name="gear" size={20} style={{color: '#D3D3D3'}}>
              <Text style={styles.text}> Options</Text>
            </Icon>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[deviceHeight*0.35, 200, 0]}
        initialSnapIndex={0}
        style={{
          width: deviceWidth,
          height: 400,
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
    width: 150,
    height: 35,
    borderRadius: 100,
    marginBottom: 55,
    backgroundColor: '#31b048',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacity: {
    width: '90%',
    height: deviceHeight*0.07,
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
