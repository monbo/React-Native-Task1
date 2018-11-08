import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Map from './views/Map.js';
import Form from './views/Form.js';
import ListView from './views/ListView.js';
import ListViewDetail from './views/ListViewDetail.js';

const ListStack = createStackNavigator({
ListView: ListView,
ListViewDetail: ListViewDetail
});

export const Tabs = createBottomTabNavigator({

    Map: {
        screen: Map,
    },
    Form: {
        screen: Form,
    },
    ListView: {
        screen: ListStack,
    }
},
    {
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            labelStyle: {
                fontSize: 22,
                padding: 12
            }
        }
    }
);
