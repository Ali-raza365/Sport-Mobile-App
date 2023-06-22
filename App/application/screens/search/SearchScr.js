import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Chip } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventStore from '../../Store/EventStore';
import UserStore from '../../Store/UserStore';
import { SearchBar } from '../../components';
import {
  COLORS,
  HP,
  SPACING_PERCENT,
  WP
} from '../../theme/config';
import { _momentDateFormat } from '../../utils/TimeFunctions';
import CardItem from '../../components/CardItem';

const SearchScr = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);


  const { Events, Searchevents, setActivityEvents, Activites, fetchEvents, fetchActivites, FetchSearchEvents } = EventStore();
  const { user, token } = UserStore();

  const handleTextSubmit = () => {
    if (!searchQuery) return
    FetchSearchEvents({ text: searchQuery }, token)
  };

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


  const SearchComp = ({ item }) => {
    return (
      <CardItem
        hideFav={true}
        onPress={() => { navigation.navigate("eventdetail", { detail: item }) }}
        item={item}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <SearchBar
          placeholder="Search"
          returnKeyType="search"
          handleTextSubmit={handleTextSubmit}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Ionicons
          name="md-search"
          size={WP(8)}
          onPress={handleTextSubmit}
          color={COLORS.primaryColor}
        />
      </View>

      <View style={styles.filterContainer} horizontal>
        <Chip
          style={{
            backgroundColor: COLORS.primaryColor,
            marginLeft: WP(SPACING_PERCENT),
          }}
          selectedColor={COLORS.whiteColor}
          type="flat"
          onPress={() => console.log('Pressed')}>
          Filter
        </Chip>
        <Chip
          style={{
            backgroundColor: COLORS.primaryColor,
            marginLeft: WP(SPACING_PERCENT),
          }}
          selectedColor={COLORS.whiteColor}
          type="outlined"
          onPress={() => { navigation.navigate('MapScreen') }}>
          Location
        </Chip>
        <Chip
          style={{
            backgroundColor: COLORS.primaryColor,
            marginLeft: WP(SPACING_PERCENT),
          }}
          selectedColor={COLORS.whiteColor}
          type="outlined"
          onPress={() => console.log('Pressed')}>
          Category
        </Chip>
      </View>

      <FlatList
        keyExtractor={(_, i) => `item${i}`}
        showsVerticalScrollIndicator={false}
        disableVirtualization={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: HP(20), padding: WP(3), }}
        data={Searchevents !== null ? Searchevents : Events}
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
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: WP(SPACING_PERCENT),
  },

  mainContainer: {
    width: '100%',
    height: HP(20),
    backgroundColor: COLORS.whiteColor,
    borderBottomWidth: 1,
    padding: WP(3),
    borderColor: COLORS.grey,
    borderRadius: 10,
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    width: '42%',
    height: '100%',
  },
  headingContainer: { padding: 7, width: WP('55') },
  heading: { fontSize: WP(4.5), fontWeight: 'bold', color: '#000000', paddingVertical: 5 },
  description: { fontSize: 15, color: '#000000', paddingBottom: 5 },
  favourite: { position: 'absolute', top: 5, right: 12 },
});
