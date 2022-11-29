import React from 'react';
import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

export const TabBar = ({tab, setTab, setSelectedNote}) => {
    const _renderIcon = (routeName, selectedTab) => {
        let icon = '';
        let size;

        switch (routeName) {
            case 'search':
                icon = 'ios-search-outline';
                size = 25;
                break;
            case 'settings':
                icon = 'ios-menu-sharp';
                size = 25;
                break;
            case 'blank':
                size = 0
                break;
        }

        return (
            <Ionicons
                name={icon}
                size={size}
                color={routeName === tab ? 'red' : 'gray'}
            />
        );
    };

    const handleSetTab = (routeName, navigate) => {
        setTab(routeName)
        navigate(routeName)
    };

    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        
        return (
            <TouchableOpacity
                onPress={() => handleSetTab(routeName, navigate)}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        );
    };

    const buttonScreen1 = () => {
        return <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />
    }
    const buttonScreen2 = () => {
        return <View style={{ backgroundColor: '#FFEBCD', flex: 1 }} />
    }

    const blank = () => {
        return <></>
    }

    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <CurvedBottomBar.Navigator
                    style={styles.bottomBar}
                    strokeWidth={0.5}
                    strokeColor="#DDDDDD"
                    height={55}
                    circleWidth={55}
                    bgColor="white"
                    initialRouteName="blank"
                    borderTopLeftRight
                    renderCircle={({ selectedTab, navigate }) => (
                        <Animated.View style={styles.btnCircle}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '120%'
                                }}
                                onPress={() => setSelectedNote({})}>
                                <Ionicons name={'ios-add-sharp'} color="gray" size={25} />
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                    tabBar={renderTabBar}
                    >
                    <CurvedBottomBar.Screen
                        name="search"
                        position="LEFT"
                    >{buttonScreen1}</CurvedBottomBar.Screen>
                    <CurvedBottomBar.Screen
                        name="settings"
                        position="RIGHT"
                    >{buttonScreen2}</CurvedBottomBar.Screen>
                    <CurvedBottomBar.Screen
                        name="blank"
                        position="CENTER"
                    >{blank}</CurvedBottomBar.Screen>
                </CurvedBottomBar.Navigator>
            </NavigationContainer>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button: {
        marginVertical: 5,
    },
    bottomBar: {},
    btnCircle: {
        width: 60,
        height: 60,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
        bottom: 30,
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },
    img: {
        width: 30,
        height: 30,
    },
});