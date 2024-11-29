import React from 'react';
import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../colors';
import Button from '../Button';
import fonts from '../fonts';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1, padding: '5%' }}>
        {/* Hero Images Section */}
        <View>
          <Image
            source={require('../assets/hero4.jpg')}
            style={{
              height: height * 0.12, // Adjust based on screen height
              width: width * 0.2, // Adjust based on screen width
              borderRadius: 20,
              position: 'absolute',
              top: height * 0.05,
              transform: [{ translateX: width * 0.05 }, { translateY: height * 0.05 }, { rotate: '-15deg' }],
            }}
          />
          <Image
            source={require('../assets/hero2.png')}
            style={{
              height: height * 0.12,
              width: width * 0.2,
              borderRadius: 20,
              position: 'absolute',
              top: -height * 0.03,
              left: width * 0.25,
              transform: [{ translateX: width * 0.1 }, { translateY: height * 0.05 }, { rotate: '-5deg' }],
            }}
          />
          <Image
            source={require('../assets/hero3.jpg')}
            style={{
              width: width * 0.2,
              height: height * 0.12,
              borderRadius: 20,
              position: 'absolute',
              top: height * 0.15,
              left: -width * 0.1,
              transform: [{ translateX: width * 0.1 }, { translateY: height * 0.05 }, { rotate: '15deg' }],
            }}
          />
          <Image
            source={require('../assets/hero1.png')}
            style={{
              height: height * 0.24,
              width: width * 0.4,
              borderRadius: 20,
              position: 'absolute',
              top: height * 0.12,
              left: width * 0.25,
              transform: [{ translateX: width * 0.1 }, { translateY: height * 0.05 }, { rotate: '-15deg' }],
            }}
          />
        </View>

        {/* Text and Buttons Section */}
        <View
          style={{
            paddingHorizontal: '5%',
            position: 'absolute',
            top: height * 0.5,
            width: '100%',
          }}
        >
          <Text
            style={[
              fonts.poppinsBold,
              {
                fontSize: width * 0.17, // Dynamic font size
                fontWeight: '800',
                color: COLORS.white,
              },
            ]}
          >
            Let's Get
          </Text>
          <Text
            style={[
              fonts.poppinsBold,
              {
                fontSize: width * 0.14,
                fontWeight: '800',
                color: COLORS.white,
              },
            ]}
          >
            Started
          </Text>
          <View style={{ marginVertical: height * 0.02 }}>
            <Text
              style={{
                fontSize: width * 0.04,
                color: COLORS.white,
                marginVertical: 4,
              }}
            >
              Check your eye health with EyeCheck
            </Text>
            <Text
              style={{
                fontSize: width * 0.04,
                color: COLORS.white,
              }}
            >
              Test your eye today!
            </Text>
          </View>

          <Button
            title="Join Now"
            onPress={() => navigation.navigate('Signup')}
            style={{
              marginTop: height * 0.03,
              width: '100%',
              left: 15,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: height * 0.01,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: width * 0.04,
                color: COLORS.white,
              }}
            >
              Already have an account?
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: width * 0.04,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  marginLeft: 4,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
