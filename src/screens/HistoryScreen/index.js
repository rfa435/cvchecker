/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, ScrollView, RefreshControl} from 'react-native';
import {get} from '../../adapter';
import {getStorage} from '../../helper/storage';
import {Auth} from 'aws-amplify';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getDataHistory();
  }, []);

  const getDataHistory = async () => {
    const dataHistory = await get('history-scoring' + '/' + Auth.user.attributes.name);

    if (dataHistory.data.statusCode === 200) {
      setHistory(dataHistory.data.data);
    } else {
      Alert.alert('Uh-oh', 'Failed getting history!');
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getDataHistory} />
      }>
      <View style={{width: '100%', alignItems: 'center', paddingVertical: 10}}>
        {history.length > 0 ? (
          history.map(his => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}
                key={his._id}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    width: 110,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#f39c12',
                      fontSize: 40,
                      fontWeight: 'bold',
                    }}>
                    {his.score}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#f39c12',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70%',
                  }}>
                  <Text style={{color: '#fff', fontSize: 25}}>
                    {his.roleName}
                  </Text>
                  <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15}}>
                    submitted by {his.createdBy}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 20,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#f39c12'}}>
              No history yet...
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;
