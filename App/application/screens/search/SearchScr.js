import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  HP,
  INPUT_HEIGHT,
  SPACING_PERCENT,
  TAB_ICON_SIZE,
  WP,
} from '../../theme/config';
import {SearchBar} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatCommIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Chip} from 'react-native-paper';

const SearchScr = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const dataArr = [
    {
      name: '2023 Australian Open',
      category: 'Tennis',
      time: '2023-01-16T00:00:00Z',
      isFav: true,
      image:
        'https://m.economictimes.com/thumb/msid-77734860,width-1200,height-900,resizemode-4,imgsize-951020/sports_istock.jpg',
    },
    {
      name: '2023 Super Bowl',
      category: 'Football',
      time: '2023-02-05T18:00:00Z',
      isFav: false,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYRZienzDweuLl7OkZViMXrOR7YKW1SnuM6icGu88HzF-XAPtU48j8WPMAJJmd9aULDA&usqp=CAU',
    },
    {
      name: '2023 NBA Finals',
      category: 'Basketball',
      time: '2023-06-01T00:00:00Z',
      isFav: true,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSADxQWX5JZ-Db-72-Wppkjk_xpc95IV1sWdtd2d-5hDrT63NjvXI2F-RQnEz26eyA4N8&usqp=CAU',
    },
    {
      name: '2023 World Series',
      category: 'Baseball',
      time: '2023-10-20T00:00:00Z',
      isFav: false,
      image:
        'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_640,q_65,w_640/v1/clients/lakecharles-redesign/Baseball_VLC_Kathryn_Shea_Duncan_33781787-d9b1-44fe-80a0-04e79e6b275e.jpg',
    },
    {
      name: '2024 Winter Olympics',
      category: 'Multi-sport',
      time: '2024-02-09T08:00:00Z',
      isFav: true,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9DDz8MeHhJ-x1zzQpQ-WeQugEJPrBfAJ1XQ&usqp=CAU',
    },
  ];

  const SearchComp = ({item, index}) => {
    const event = new Date(item?.time);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item?.image}}
            resizeMode="cover"
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={styles.headingContainer}>
          <Text style={{fontSize:12,color:"#686868" }}>{item?.category}</Text>
          <Text style={styles.heading}>
            {item?.name}
          </Text>
          <Text style={{color: 'green', fontWeight: '700'}}>
            {event.toDateString()}
          </Text>
          <Ionicons
          onPress={()=>{console.log("press")}}
            style={styles.favourite}
            name="heart-outline"
            color={COLORS.darkGrey}
            size={WP(5)}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <SearchBar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <MatCommIcons
          name="heart-plus-outline"
          size={WP(8)}
          color={COLORS.primaryColor}
        />
      </View>

      <View style={styles.filterContainer}>
        <Chip
          style={{
            backgroundColor: COLORS.primaryColor,
            marginLeft: WP(SPACING_PERCENT),
          }}
          icon="filter"
          closeIcon="chevron-down"
          onClose={() => {}}
          selected={true}
          selectedColor={COLORS.whiteColor}
          type="flat"
          onPress={() => console.log('Pressed')}>
          Filter
        </Chip>
        <Chip
          style={{
            borderWidth: 1,
            borderColor: COLORS.primaryColor,
            backgroundColor: 'transparent',
            marginHorizontal: WP(SPACING_PERCENT),
          }}
          icon="filter"
          closeIcon="chevron-down"
          onClose={() => {}}
          selected={true}
          selectedColor={COLORS.primaryColor}
          type="outlined"
          onPress={() => console.log('Pressed')}>
          Location
        </Chip>
        <Chip
          style={{
            borderWidth: 1,
            borderColor: COLORS.primaryColor,
            backgroundColor: 'transparent',
          }}
          icon="filter"
          closeIcon="chevron-down"
          onClose={() => {}}
          selected={true}
          selectedColor={COLORS.primaryColor}
          type="outlined"
          onPress={() => console.log('Pressed')}>
          Category
        </Chip>
      </View>

      <FlatList
        keyExtractor={(_, i) => `item${i}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: HP(20)}}
        data={dataArr}
        renderItem={SearchComp}
      />
    </SafeAreaView>
  );
};

export default SearchScr;

const styles = StyleSheet.create({
  headerContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: WP(SPACING_PERCENT / 2),
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
  },

  mainContainer: {
    width: '100%',
    height: HP(20),
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    marginBottom: 1,
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    width: '42%',
    height: '100%',
  },
  headingContainer:{padding: 7 ,width:WP('58')},
  heading:{fontSize: 18, fontWeight: 'bold', color: '#000000',paddingVertical:5},
  favourite:{position: 'absolute', bottom: 5, right: 5},

});
