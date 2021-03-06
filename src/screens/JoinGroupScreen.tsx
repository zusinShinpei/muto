import * as React from "react";
import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";
import { SafeAreaView } from "react-navigation";
import {
  COLOR_PALE_GREY,
  COLOR_TWILIGHT_BLUE,
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_PLACEHOLDER
} from "../constants/color";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { getWidth, getHeight } from "../constants/size";
import fonts from "../constants/fonts";
import { IMAGE_LOGO, IMAGE_BACK } from "../constants/image";

interface JoinGroupScreenProps {
  navigation: NavigationScreenProp<{}>;
}

const JoinGroupScreen = (props: JoinGroupScreenProps) => {
  const { navigation } = props;
  const [code, setCode] = React.useState("");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR_PALE_GREY
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: getWidth(90),
          height: 5,
          backgroundColor: COLOR_TWILIGHT_BLUE
        }}
      />
      <Text
        style={[
          fonts.namoo,
          {
            color: COLOR_BLACK,
            fontSize: 24,
            position: "absolute",
            top: getHeight(27),
            left: getWidth(16)
          }
        ]}
        allowFontScaling={false}
      >
        초대 코드를 입력해주세요.
      </Text>

      <View style={{ justifyContent: "flex-end" }}>
        <Image
          source={IMAGE_LOGO}
          style={{
            width: getWidth(120),
            height: getWidth(39.8),
            position: "absolute",
            top: getWidth(-30),
            right: getWidth(-165)
          }}
        />
      </View>
      <View
        style={{
          marginBottom: getHeight(150)
        }}
      >
        <View
          style={{
            width: getWidth(280),
            height: getWidth(40),
            justifyContent: "center",
            backgroundColor: COLOR_WHITE,
            borderRadius: 8
          }}
        >
          <TextInput
            value={code}
            onChange={evt => setCode(evt.nativeEvent.text)}
            placeholder={"초대 코드"}
            placeholderTextColor={COLOR_PLACEHOLDER}
            underlineColorAndroid="transparent"
            style={[
              fonts.namoo,
              {
                color: COLOR_TWILIGHT_BLUE,
                fontSize: 18,
                marginLeft: getWidth(19)
              }
            ]}
            allowFontScaling={false}
            autoCompleteType="tel"
            keyboardType="number-pad"
            maxLength={11}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: getWidth(280),
          height: getWidth(40),
          backgroundColor: COLOR_TWILIGHT_BLUE,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          position: "absolute",
          bottom: getHeight(110)
        }}
        onPress={async () => {
          const response = await fetch(
            "https://hanseithon.curo.xyz/R/joinGroup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                code
              })
            }
          );
          const json = await response.json();
          console.log(json);

          json.status === "200" && navigation.popToTop();
        }}
      >
        <Text
          style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
          allowFontScaling={false}
        >
          다음
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

JoinGroupScreen.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<{}>;
}): NavigationScreenOptions => {
  return {
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={{ marginLeft: getWidth(16) }}
      >
        <Image
          source={IMAGE_BACK}
          style={{ width: getWidth(24), height: getWidth(24) }}
          width={getWidth(24)}
          height={getWidth(24)}
        />
      </TouchableOpacity>
    )
  };
};

export default JoinGroupScreen;
