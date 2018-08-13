/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, TouchableHighlight, TouchableOpacity, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Swipeable from 'react-native-swipeable';
import Autolink from 'react-native-autolink';
import realmData from './realmData';
import SearchBar from 'react-native-searchbar';
//import NfcManager, { NdefParser } from 'react-native-nfc-manager'
const SettingsIcon = require('./resources/settings.png');

//AppRegistry.registerComponent('NfcManagerDev', () => App);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      data: [{ name: 'Michael Janvier', company: 'ADM Tronics', ocupationTitle: 'Software Developer', phoneNumber: '302-521-1541', email: 'mjanvier@admtronics.com', website: 'www.admtronics.com/', backgroundColor: '#70C1B3' },
      { name: 'Hunter Bartholomew', company: 'Logic Works', ocupationTitle: 'Backend Developer', phoneNumber: '302-521-1541', email: 'Hbart@gmail.com', website: 'www.admtronics.com/', backgroundColor: '#B2DBBF' },
      { name: 'Charles Shotmeyer', company: 'Striker', ocupationTitle: 'Business Analyst', phoneNumber: '302-521-1541', email: 'Cshots@gmail.com', website: 'www.admtronics.com/', backgroundColor: '#F3FFBD' },
      { name: 'Tom ackershoek', company: 'Exxon', ocupationTitle: 'Chemical Engineer', phoneNumber: '302-521-1541', email: 'Tack@me.com', website: 'www.admtronics.com/', backgroundColor: '#FF1654' },
      { name: 'John Doe', company: 'CIA', ocupationTitle: 'Security', phoneNumber: '302-521-1541', email: 'Jdoe@gmail.com', website: 'www.admtronics.com/', backgroundColor: 'white' }],

      activeSlide: 0
    }

  }

  componentWillMount() {
    /*NfcManager.start({
      onSessionClosedIOS: () => {
        console.log('ios session closed');
      }
    })
      .then(result => {
        console.log('start OK', result);
      })
      .catch(error => {
        console.warn('device does not support nfc!');
        this.setState({ supported: false });
      })*/
  }

  get pagination() {
    const { data, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={!!this._carousel}
        carouselRef={this._carousel}
      />
    );
  }

  _renderItem({ item, index }) {
    const { height, width } = Dimensions.get('window');
    console.log(height, width);
    const rightButtons = [
      <TouchableHighlight style={styles.rightSwipeItem} height={width / 1.75} onPress={() => this.deleteTreatment()}><Text>Delete</Text></TouchableHighlight>,
    ];
    return (
      <Swipeable
        rightButtons={rightButtons}
        rightActionActivationDistance={100}
        backgroundColor={item.backgroundColor}
        width={(width * .9)} height={width / 1.75}>
        <View flex={1} flexDirection={'column'} alignItems='center' justifyContent='center'>
          <Text fontWight={'bold'} fontSize={20}>{item.company}</Text>
          <Text>{item.name}</Text>
          <Text>{item.ocupationTitle}</Text>
          <Autolink
            text={item.phoneNumber}
            phone={true} />
          {/*<Text>{item.phoneNumber}</Text>*/}
          <Autolink
            text={item.email}
            email={true} />
          {/*<Text>{item.email}</Text>*/}
          <Autolink
            text={item.website}
            url={true} />
        </View>
      </Swipeable >
    );
  }

  _handleResults(results) {
    this.setState({ results });
  }

  render() {
    const { height, width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
      <SearchBar
      marginTop='2%'
            ref={(ref) => this.searchBar = ref}
            data={this.state.data}
            handleResults={this._handleResults}
            showOnLoad={true}
          />
        <View>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.data}
            renderItem={this._renderItem}
            itemHeight={(width * .9) / 1.75}
            sliderHeight={height * .9}
            vertical={true}
            layout={'stack'}
            layoutCardOffset={30}
            enableMomentum={true}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          />
          {this.pagination}
          </View>
        <View position='absolute' left='2%' bottom='1%'>
          <TouchableOpacity left='5%' onPress={() => { console.log('Settings Pressed') }}>
            <Image source={SettingsIcon} style={{ margin: '2%', height: 50, width: 50 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#247BA0',
    padding: '2%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  rightSwipeItem: {
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: 'red'
  }
});