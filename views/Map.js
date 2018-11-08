import React, { Component } from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MapView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

export default Map;