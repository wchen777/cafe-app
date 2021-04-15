import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native'
import { View, Button, Text } from 'react-native-ui-lib';
import HeaderBarLogo from '../../components/header/HeaderBarLogo'
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';

import ImageCard from '../../components/cards/ImageCard';
import AudioCard from '../../components/cards/AudioCard';
import TextCard from '../../components/cards/TextCard';

export default function ExploreView({ navigation, allPosts, setAllPosts, selectedCategory, setSelectedCategory }) {

    const orange = '#FFB36C';
    const black = '#000000';


    useEffect(() => {
        navigation.setOptions({
            headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
            headerBackImage: () => <HeaderBack />,
            headerRight: ""
        });
    })

    const filterCategory = (category) => {
        if (category === "painting") {
            setSelectedCategory("painting");
        } else if (category === "digital art") {
            setSelectedCategory("digital art");
        } else if (category === "design") {
            setSelectedCategory("design");
        } else if (category === "photography") {
            setSelectedCategory("photography");
        } else if (category === "music") {
            setSelectedCategory("music");
        } else if (category === "podcast") {
            setSelectedCategory("podcast");
        } else if (category === "writing") {
            setSelectedCategory("writing");
        } else if (category === "commentary") {
            setSelectedCategory("commentary");
        }
    }

    const setColor = (category) => {
        if (selectedCategory === category) {
            return orange;
        } else {
            return black;
        }
    }

    let topPosts = false;
    const filterByValue = (value) => {
        if (value === 'All') {
            topPosts = false;
        } else {
            topPosts = true;
        }
    }

    let count = 1;
    const postsComponents = 
    allPosts.map((p) => {
        switch (p.category.toLowerCase()) {
            case selectedCategory:
                if (selectedCategory === 'painting') {
                    return (<ImageCard  navigation={navigation} imagePost = {p} key={count++}/>);
                } else if (selectedCategory === 'digital art') {
                    return (<ImageCard  navigation={navigation} imagePost = {p} key={count++}/>);
                } else if (selectedCategory === 'design') {
                    return (<ImageCard  navigation={navigation} imagePost = {p} key={count++}/>);
                } else if (selectedCategory === 'photography') {
                    return (<ImageCard  navigation={navigation} imagePost = {p} key={count++}/>);
                } else if (selectedCategory === 'music') {
                    return (<AudioCard  navigation={navigation} audioPost = {p} key={count++}/>);
                } else if (selectedCategory === 'podcast') {
                    return (<AudioCard  navigation={navigation} audioPost = {p} key={count++}/>);
                } else if (selectedCategory === 'writing') {
                    return (<TextCard  navigation={navigation} textPost = {p} key={count++}/>);
                } else if (selectedCategory === 'commentary') {
                    return (<TextCard  navigation={navigation} textPost = {p} key={count++}/>);
                } 
            default:
                return
        }

    })

    let data = [{
        value: 'Top Posts',
    }, {
        value: 'All',
    }];

    return (
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingBottom: 0 }}>
            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>
                 <View style={{flexDirection:'row', marginTop: 10}}>
                    <ScrollView horizontal={true} indicatorStyle='white'>
                    <Button
                        backgroundColor="white"
                        label="digital art"
                        color={setColor("digital art")}
                        outline={true}
                        outlineColor={setColor("digital art")}
                        labelStyle={{ fontWeight: '600', fontSize: 15 }}
                        style={{ width: 120, height: 40, marginRight: 10, marginLeft: 10 }}
                        borderRadius= {10}
                        enableShadow
                        onPress={() => filterCategory("digital art")}
                    />
                    <Button
                        backgroundColor="white"
                        label="painting"
                        outline={true}
                        labelStyle={{ fontWeight: '600', fontSize: 15 }}
                        style={{ width: 100, height: 40, marginRight: 10 }}
                        borderRadius= {10}
                        enableShadow
                        onPress={() => filterCategory("painting")}
                        color={setColor('painting')}
                        outlineColor={setColor("painting")}
                    />
                    <Button
                        backgroundColor="white"
                        label="design"
                        color={setColor("design")}
                        outline={true}
                        outlineColor={setColor("design")}
                        labelStyle={{ fontWeight: '600', fontSize: 15 }}
                        style={{ width: 100, height: 40, marginRight: 10 }}
                        borderRadius= {10}
                        enableShadow
                        onPress={() => filterCategory("design")}
                    />
                    <Button
                        backgroundColor="white"
                        label="photography"
                        color={setColor("photography")}
                        outline={true}
                        outlineColor={setColor("photography")}
                        labelStyle={{ fontWeight: '600', fontSize: 15 }}
                        style={{ width: 140, height: 40, marginRight: 10 }}
                        borderRadius= {10}
                        enableShadow
                        onPress={() => filterCategory("photography")}
                    />
                    <Button
                        backgroundColor="white"
                        label="music"
                        color={setColor("music")}
                        outline={true}
                        outlineColor={setColor("music")}
                        labelStyle={{ fontWeight: '600', fontSize: 15 }}
                        style={{ width: 100, height: 40, marginRight: 10 }}
                        borderRadius= {10}
                        enableShadow
                        onPress={() => filterCategory("music")}
                    />
                    <Button
                        backgroundColor="white"
                        label="podcast"
                        color={setColor("podcast")}
                        outline={true}
                        outlineColor={setColor("podcast")}
                        labelStyle={{ fontWeight: '600', fontSize: 15 }}
                        style={{ width: 100, height: 40, marginRight: 10 }}
                        borderRadius= {10}
                        enableShadow
                        onPress={() => filterCategory("podcast")}
                    />
                    <Button
                        backgroundColor="white"
                        label="writing"
                        color={setColor("writing")}
                        outline={true}
                        outlineColor={setColor("writing")}
                        labelStyle={{ fontWeight: '600', fontSize: 15 }}
                        style={{ width: 100, height: 40, marginRight: 10 }}
                        borderRadius= {10}
                        enableShadow
                        onPress={() => filterCategory("writing")}
                    />
                    <Button
                        backgroundColor="white"
                        label="commentary"
                        color={setColor("commentary")}
                        outline={true}
                        outlineColor={setColor("commentary")}
                        labelStyle={{ fontWeight: '600', fontSize: 15 }}
                        style={{ width: 140, height: 40, marginRight: 10 }}
                        borderRadius= {10}
                        enableShadow
                        onPress={() => filterCategory("commentary")}
                    />
                    </ScrollView>
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
                <Dropdown
                    label='Show'
                    value = 'All'
                    data={data}
                    width={250}
                    onChangeText={(value, index, data) => filterByValue(value)}
                    
                    
                />
                </View>

                <View style={{marginTop: 20}}>
                    {postsComponents}
                </View>


            </ScrollView>
        </View>


    )
}