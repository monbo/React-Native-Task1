import React, { Component } from 'react';
import { Text, View, Navigation} from 'react-native';

class ListViewDetail extends Component {

  state = {
        message: null
    }

  componentDidMount() {
        const { navigation } = this.props;
        this.setState({
            message: navigation.getParam('message', 'NO-MESSAGE')
        },
            () => {
                this.setState({ isLoading: false });
            });

    }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

export default ListViewDetail;
