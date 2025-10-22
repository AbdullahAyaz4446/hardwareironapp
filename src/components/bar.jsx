import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Bar = () => {
  return (
    <View style={styles.main}>
      <View
        style={{
          width: '45%',
          height: 1,
          backgroundColor: '#A5A5A5',
          paddingTop: 1,
        }}
      ></View>
      <View>
        <Text
          style={{ paddingHorizontal: 10, color: '#A5A5A5', paddingBottom: 2 }}
        >
          or with
        </Text>
      </View>
      <View
        style={{ width: '45%', height: 1, backgroundColor: '#A5A5A5' }}
      ></View>
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
