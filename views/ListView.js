import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView,
  TouchableNativeFeedback,Platform, ActivityIndicator} from 'react-native';

class ListView extends Component {
  constructor(props) {
    super(props);

      this.state = {
          data: [],
          loading: false,
          error: null,
          alignmentCount: 0
      };
    }

   componentDidMount() {
     this.makeRemoteRequest();
   }

   makeRemoteRequest = () => {
       const url = 'https://randomuser.me/api/?results=50';
       this.setState({ loading: true });
       fetch(url)
         .then(response => response.json())
         .then(responseJson => {
           console.log(responseJson);
           this.setState({
             data: responseJson.results,
             error: responseJson.error || null,
             loading: false
           });
         })
         .catch(error => {
           this.setState({ error, loading: false });
         });
     };

   render() {
     const { data, loading, error, alignmentCount} = this.state;
     if (loading) {
       return(
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator/>
          <Text>Loading</Text>
       </View>
      )
     }
      return (
        //Android native element is TouchableNativeFeedback
        //ios native element should be TouchableOpacity 
        <ScrollView>
          {data.map((item,index) =>
            <View  key = {item.id.value}  style={styles.container1}>
            {Platform.OS === 'android'
            ? <TouchableNativeFeedback key = {item.id.value}
                onPress = {() => this.props.navigation.navigate('ListViewDetail', {
                message: item.name.first
              })}
              background={TouchableNativeFeedback.SelectableBackground()}
            >
              <View style={styles.overlay}>
                <Image source={{uri:item.picture.thumbnail, width: 64, height: 64}}/>
                {index % 2 === 0
                  ?  <Text style={styles.overlayText}>{item.name.first}</Text>
                  :  <Text style={styles.overlayText1}>{item.name.first}</Text>
                }
              </View>

            </TouchableNativeFeedback>
              : <TouchableOpacity
                  onPress = {() => this.props.navigation.navigate('ListViewDetail', {
                  message: item.name.first
            })} >
                <View style={styles.overlay}>
                  <Image source={{uri:item.picture.thumbnail, width: 64, height: 64}}/>
                  {index % 2 === 0
                    ?  <Text style={styles.overlayText}>{item.name.first}</Text>
                    :  <Text style={styles.overlayText1}>{item.name.first}</Text>
                  }
                </View>
              </TouchableOpacity>
            }

            </View>)
          }
        </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
  container1: {
    paddingTop: 0,
  },
  overlay: {
    marginBottom: 0,
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    borderColor: '#fff'
  },
  overlayText: {
    padding: 20,
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 20
  },
  overlayText1: {
    padding: 20,
    color: 'white',
    alignSelf: 'flex-end',
    fontSize: 20
  }
})

export default ListView
