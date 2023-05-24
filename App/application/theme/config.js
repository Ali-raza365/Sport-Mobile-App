import React from 'react';
import {
     Platform,
     Dimensions,
     useWindowDimensions,
} from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
// import Lang from '../translations';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MatIcons from 'react-native-vector-icons/MaterialIcons';

//CONSTANTS USED IN APP
export const APP_NAME = 'SportApp';
export const PLATFORM = Platform.OS;
export const WP = widthPercentageToDP;
export const HP = heightPercentageToDP;
export const MOBILE_WIDTH = Dimensions.get('window').width;
export const MOBILE_HEIGHT = Dimensions.get('window').height;
export const RADIUS = 3;
export const SPACING = 12;
export const SPINNER_SIZE = 32;
export const FONT = null;
export const FONT_BOLD = null;
export const FONT_MEDIUM = null;
export const FONT_LIGHT = null;
export const FONT_SEMIBOLD = null;
export const BUTTON_HEIGHT = 5;
export const INPUT_HEIGHT = 6;
export const SCREEN_ICON_SIZE = 6;
export const HOME_TAB_ICON_SIZE = 6;
export const TAB_ICON_SIZE = 6;

//COLORS USED IN APPLICATION
export const COLORS = {
     primaryColor: '#ff7f00',
     secondaryColor: '#414260',
     primaryRGB: 'rgba(90,44,102,',
     territoryColor: '#9D4DB3',
     primaryColor2: '#9E2654',
     secondaryColor2: '#BC2E65',
     territoryColor2: '#D34D80',
     lightGrey: '#8C8A9A',
     gray500:"#C0BFBF",
     darkGrey: '#7E7E7E',
     grey: 'rgba(192, 192, 192, 0.3)',
     blackColor: '#000',
     whiteColor: '#ffffff',
     borderColor: '#AFAFAF',
     redColor: '#E6344A',
     greenColor: '#21CE99',
     yellowColor: '#F5BA03',
     offWhiteColor:'##F5F5F5',
   
};

export const EXPENSE_COLORS = ["tomato", "orange", '#FF7F50', "gold", 'yellow', '#90EE90', 'green', '#A84420', '#FFC600', '#FE5000', '#12B347', '#E8A20C', '#E6A467']

//FONT SIZES USED IN APP
export const FONT_SIZES = {
     h1: 28,
     h2: 22,
     h3: 18,
     info_1: 16,
     info_2: 14,
};

//FONT SIZES USED IN APP
export const TEXT_SIZES = {
     h1: 7,
     h2: 6,
     h3: 5,
     info_1: 4,
     info_2: 3.5,
};

export const SPACING_PERCENT = 5;






//MONTHS
export const MONTHS = [
     'Jan',
     'Feb',
     'Mar',
     'Apr',
     'May',
     'Jun',
     'Jul',
     'Aug',
     'Sep',
     'Oct',
     'Nov',
     'Dec',
];

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


//IMAGES FOR THE APP
export const IMAGES = {
     splash_img: require("../assets/images/splash_bg.jpeg"),
     mainLogo: require("../assets/images/Sports.png"),
     whiteLogo: require("../assets/images/Connection2.png"),
     onboard_img: require("../assets/images/board_img.png"),
     user_logo:require('../assets/images/user.png'),
     delivery_img:require('../assets/images/delivery.png'),
     gallery_Img:require('../assets/images/GalleryPicker.png'),
     file_upload_img:require('../assets/images/fileUpload.png'),
     camera:require('../assets/images/camera.png'),
     building_img:require('../assets/images/building.png'),
     location_logo:require('../assets/images/location.png'),
     menu_icon:require('../assets/images/menu_bar.png'),


};

export const DEFAULT_PICTURE = "https://firebasestorage.googleapis.com/v0/b/connection-1fe0f.appspot.com/o/ProfilePictures%2Fno-profile-picture-icon.png?alt=media&token=8bd51e4a-9c3a-40c6-82b0-a8714beab7ad";


export const ON_BOARD_DATA = [
     {
          key:0,
          title:"Get The Fastest \n Food Delivery",
          des:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point o"
     },
     {
          key:1,
          title:"Get The Fastest \n Food Delivery",
          des:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point o"
     },
     {
          key:2,
          title:"Get The Fastest \n Food Delivery",
          des:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point o"
     },
]













