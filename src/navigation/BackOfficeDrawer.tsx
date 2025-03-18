import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import {DrawerActions} from '@react-navigation/native'
import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {Divider, Icon} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

type MenuItem = {
  label: string
  route: string
  activeOn: string[]
  activeIcon: string
  inactiveIcon: string
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    route: 'Dashboard',
    activeOn: ['Dashboard'],
    activeIcon: 'ant-appstore1',
    inactiveIcon: 'ant-appstore1',
  },
  {
    label: 'Courses',
    route: 'CourseList',
    activeOn: ['CourseList', 'CourseCreate', 'CourseDetail'],
    activeIcon: 'hospital-box-outline',
    inactiveIcon: 'hospital-box-outline',
  },
  {
    // should be on last item
    label: 'Exit',
    route: 'none',
    activeOn: [],
    activeIcon: 'exit-to-app',
    inactiveIcon: 'exit-to-app',
  },
]

export default function BackOfficeDrawer(props: DrawerContentComponentProps) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {routeNames, index} = props.state

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('@assets/logo.png')} style={styles.logoImage} />
      </View>
      <Divider style={styles.divider} />

      {menuItems.map((item, ItemIndex) => {
        const focused = item.activeOn.some(name => name == routeNames[index])
        const isLastIndex = menuItems.length == ItemIndex + 1
        return (
          <DrawerItem
            key={item.route}
            label={item.label}
            labelStyle={
              focused
                ? styles.drawerItemLabelBold
                : styles.drawerItemLabelNormal
            }
            focused={focused}
            activeTintColor={theme.colors.onSurface}
            inactiveTintColor={theme.colors.onSurfaceVariant}
            activeBackgroundColor={theme.colors.surfaceContainerHighest}
            inactiveBackgroundColor={theme.colors.surface}
            style={
              isLastIndex
                ? {...styles.drawerItem, ...styles.lastDrawerItem}
                : styles.drawerItem
            }
            icon={() => (
              <Icon
                color={
                  focused
                    ? theme.colors.onSurface
                    : theme.colors.onSurfaceVariant
                }
                size={20}
                source={focused ? item.activeIcon : item.inactiveIcon}
              />
            )}
            onPress={() => {
              isLastIndex
                ? props.navigation.navigate('BottomTabScreens', {
                    screen: 'Menu',
                  })
                : props.navigation.dispatch(DrawerActions.jumpTo(item.route))
            }}
          />
        )
      })}
    </DrawerContentScrollView>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.colors.surface,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    logoContainer: {
      width: 50,
      height: 50,
      borderRadius: 100,
      backgroundColor: '#89D6B9',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    logoImage: {
      width: 40,
      height: 40,
    },
    divider: {
      marginVertical: 10,
      borderColor: theme.colors.outlineVariant,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    drawerItem: {
      borderRadius: 10,
      color: theme.colors.onSurface,
    },
    lastDrawerItem: {
      marginTop: 'auto',
      marginBottom: 20,
    },
    drawerItemLabelBold: {
      fontWeight: 'bold',
    },
    drawerItemLabelNormal: {
      fontWeight: 'normal',
    },
  })
}
