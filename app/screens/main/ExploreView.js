import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native'
import { View, Button, Text } from 'react-native-ui-lib';
import HeaderBarLogo from '../../components/header/HeaderBarLogo'
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import * as firebase from 'firebase';

import ImageCard from '../../components/cards/ImageCard';
import AudioCard from '../../components/cards/AudioCard';
import TextCard from '../../components/cards/TextCard';

export default function ExploreView({ navigation, allPosts, setAllPosts, selectedCategory, setSelectedCategory }) {

  const orange = '#FFB36C';
  const black = '#000000';

  const [filteredPosts, setFilteredPosts] = useState([])


  useEffect(() => {
    navigation.setOptions({
      headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
      headerBackImage: () => <HeaderBack />,
      headerRight: ""
    });
  })

  const filterCategory = (category) => {
    setSelectedCategory(category)
  }

  const setColor = (category) => {
    if (selectedCategory === category) {
      return orange;
    } else {
      return black;
    }
  }


  async function getPosts() {
    let doc;
    if (selectedCategory == 'Other') {
      let filterArray = ["Other (Text)", "Other (Image)", "Other (Audio)"];
      doc = await firebase 
        .firestore()
        .collection('posts')
        .where("category", "in", filterArray)
        .get()
    } else {
      doc = await firebase
      .firestore()
      .collection('posts')
      .where("category", "==", selectedCategory)
      .get();
    }

    let dataObj = doc.docs.map(doc => doc.data());
    setFilteredPosts(dataObj);
  }

  useEffect(() => {
    getPosts()
  }, [selectedCategory])

  let count = 1;
  const postsComponents =
    filteredPosts.map((p) => {
      switch (p.category) {
        case 'Painting':
          return (<ImageCard navigation={navigation} imagePost={p} key={count++} />);
        case 'Digital Art':
          return (<ImageCard navigation={navigation} imagePost={p} key={count++} />);
        case 'Design':
          return (<ImageCard navigation={navigation} imagePost={p} key={count++} />);
        case 'Photography':
          return (<ImageCard navigation={navigation} imagePost={p} key={count++} />);
        case 'Music':
          return (<AudioCard navigation={navigation} audioPost={p} key={count++} />);
        case 'Podcast':
          return (<AudioCard navigation={navigation} audioPost={p} key={count++} />);
        case 'Writing':
          return (<TextCard navigation={navigation} textPost={p} key={count++} />);
        case 'Commentary':
          return (<TextCard navigation={navigation} textPost={p} key={count++} />);
        case 'Other (Text)':
          return (<TextCard navigation={navigation} textPost={p} key={count++} />);
        case 'Other (Image)':
          return (<ImageCard navigation={navigation} textPost={p} key={count++} />);
        case 'Other (Audio)':
          return (<AudioCard navigation={navigation} audioPost={p} key={count++} />);
        default:
          return
      }
    })


  /*     let data = [{
          value: 'Top Posts',
      }, {
          value: 'All',
      }]; */

  return (
    <View style={{ flexDirection: 'column', marginBottom: 0, paddingBottom: 0 }}>
      <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <ScrollView horizontal={true} indicatorStyle='white'>
            <Button
              backgroundColor="white"
              label="digital art"
              color={setColor("Digital Art")}
              outline={true}
              outlineColor={setColor("Digital Art")}
              labelStyle={{ fontWeight: '600', fontSize: 15 }}
              style={{ width: 120, height: 40, marginRight: 10, marginLeft: 10 }}
              borderRadius={10}
              enableShadow
              onPress={() => filterCategory("Digital Art")}
            />
            <Button
              backgroundColor="white"
              label="painting"
              outline={true}
              labelStyle={{ fontWeight: '600', fontSize: 15 }}
              style={{ width: 100, height: 40, marginRight: 10 }}
              borderRadius={10}
              enableShadow
              onPress={() => filterCategory("Painting")}
              color={setColor('Painting')}
              outlineColor={setColor("Painting")}
            />
            <Button
              backgroundColor="white"
              label="design"
              color={setColor("Design")}
              outline={true}
              outlineColor={setColor("Design")}
              labelStyle={{ fontWeight: '600', fontSize: 15 }}
              style={{ width: 100, height: 40, marginRight: 10 }}
              borderRadius={10}
              enableShadow
              onPress={() => filterCategory("Design")}
            />
            <Button
              backgroundColor="white"
              label="photography"
              color={setColor("Photography")}
              outline={true}
              outlineColor={setColor("Photography")}
              labelStyle={{ fontWeight: '600', fontSize: 15 }}
              style={{ width: 140, height: 40, marginRight: 10 }}
              borderRadius={10}
              enableShadow
              onPress={() => filterCategory("Photography")}
            />
            <Button
              backgroundColor="white"
              label="music"
              color={setColor("Music")}
              outline={true}
              outlineColor={setColor("Music")}
              labelStyle={{ fontWeight: '600', fontSize: 15 }}
              style={{ width: 100, height: 40, marginRight: 10 }}
              borderRadius={10}
              enableShadow
              onPress={() => filterCategory("Music")}
            />
            <Button
              backgroundColor="white"
              label="podcast"
              color={setColor("Podcast")}
              outline={true}
              outlineColor={setColor("Podcast")}
              labelStyle={{ fontWeight: '600', fontSize: 15 }}
              style={{ width: 100, height: 40, marginRight: 10 }}
              borderRadius={10}
              enableShadow
              onPress={() => filterCategory("Podcast")}
            />
            <Button
              backgroundColor="white"
              label="writing"
              color={setColor("Writing")}
              outline={true}
              outlineColor={setColor("Writing")}
              labelStyle={{ fontWeight: '600', fontSize: 15 }}
              style={{ width: 100, height: 40, marginRight: 10 }}
              borderRadius={10}
              enableShadow
              onPress={() => filterCategory("Writing")}
            />
            <Button
              backgroundColor="white"
              label="commentary"
              color={setColor("Commentary")}
              outline={true}
              outlineColor={setColor("Commentary")}
              labelStyle={{ fontWeight: '600', fontSize: 15 }}
              style={{ width: 140, height: 40, marginRight: 10 }}
              borderRadius={10}
              enableShadow
              onPress={() => filterCategory("Commentary")}
            />
            <Button
              backgroundColor="white"
              label="other"
              color={setColor("Other")}
              outline={true}
              outlineColor={setColor("Other")}
              labelStyle={{ fontWeight: '600', fontSize: 15 }}
              style={{ width: 100, height: 40, marginRight: 10 }}
              borderRadius={10}
              enableShadow
              onPress={() => filterCategory("Other")}
            />
          </ScrollView>
        </View>

        {/*                 <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
                <Dropdown
                    label='Show'
                    value = 'All'
                    data={data}
                    width={250}
                    useNativeDriver
                />
                </View> */}

        <View style={{ marginTop: 20 }} paddingH-10>
          {postsComponents.length == 0 ?
            <View style={{ flexDirection: 'row', justifyContent: 'center'}} marginT-10>
              <Text> No posts to see here yet! </Text>
            </View>
            : postsComponents}
        </View>


      </ScrollView>
    </View>


  )
}