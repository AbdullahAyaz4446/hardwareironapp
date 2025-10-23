import { Dimensions, ImageBackground, Text, View } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from './button';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const SuccessVerificationComponent = ({
  header,
  subheader,
  onPress,
  butttonTitle,
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          backgroundColor: '#FFFFFF',
        }}
      >
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={100}
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <ImageBackground
            source={require('../../assets/success.png')}
            style={{
              width: Dimensions.get('screen').width / 3,
              aspectRatio: 1,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 32,
              color: '#010002ff',
              textAlign: 'center',
              fontWeight: 'bold',
              paddingVertical: 20,
            }}
          >
            {header}
          </Text>
          <View style={{ alignItems: 'center', paddingBottom: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: '#A6A6A6',
                paddingBottom: 10,
                textAlign: 'center',
                width: Dimensions.get('screen').width / 1.5,
              }}
            >
              {subheader}
            </Text>
          </View>

          <CustomButton
            style={{ padding: 20, fontWeight: 'bold', borderRadius: 60 }}
            title={butttonTitle}
            textStyle={{ fontWeight: 'bold' }}
            onPress={onPress}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SuccessVerificationComponent;

const styles = StyleSheet.create({});
