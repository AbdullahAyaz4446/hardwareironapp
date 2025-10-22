import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from './button';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const OnBordingComponents = ({
  image,
  header,
  paragraph,
  onPressSkip,
  onPressContinouse,
  onPressSignin,
  activebox1,
  activebox2,
  activebox3,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={100}
          style={{
            flex: 1,
          }}
        >
          <TouchableOpacity onPress={onPressSkip}>
            <Text style={{ paddingBottom: 10, fontSize: 14, color: '#54408C' }}>
              Skip
            </Text>
          </TouchableOpacity>

          <ImageBackground
            source={image}
            style={{
              width: '100%',
              aspectRatio: 1,
              alignSelf: 'center',
            }}
          />
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 32,
                color: '#010002ff',
                textAlign: 'center',
                fontWeight: 'bold',
                width: Dimensions.get('screen').width / 1.5,
                paddingBottom: 10,
              }}
            >
              {header}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              color: '#A6A6A6',
              textAlign: 'center',
              paddingBottom: 10,
            }}
          >
            {paragraph}
          </Text>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 20,
              }}
            >
              <View
                style={[
                  {
                    backgroundColor: '#E8E8E8',
                    borderRadius: 10,
                    padding: 10,
                    marginLeft: 10,
                  },
                  activebox1,
                ]}
              />
              <View
                style={[
                  {
                    backgroundColor: '#E8E8E8',
                    borderRadius: 10,
                    padding: 10,
                    marginLeft: 10,
                  },
                  activebox2,
                ]}
              />
              <View
                style={[
                  {
                    backgroundColor: '#E8E8E8',
                    borderRadius: 10,
                    padding: 10,
                    marginLeft: 10,
                  },
                  activebox3,
                ]}
              />
            </View>
            <CustomButton
              style={{ padding: 20, fontWeight: 'bold' }}
              title='Continue'
              onPress={onPressContinouse}
            />
            <CustomButton
              textStyle={{ color: '#54408C', fontWeight: 'bold' }}
              style={{ padding: 20, backgroundColor: '#EBF2EF' }}
              title='Sign in'
              onPress={onPressSignin}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBordingComponents;

const styles = StyleSheet.create({});
