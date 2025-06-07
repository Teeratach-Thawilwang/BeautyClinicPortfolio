import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import {DrawerActions} from '@react-navigation/native'
import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {Icon} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

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
    label: 'Categories',
    route: 'CategoryList',
    activeOn: ['CategoryList', 'CategoryCreate', 'CategoryDetail'],
    activeIcon: 'mat-category',
    inactiveIcon: 'mat-category',
  },
  {
    label: 'Bookings',
    route: 'BookingList',
    activeOn: ['BookingList', 'BookingDetail'],
    activeIcon: 'fa-briefcase-medical',
    inactiveIcon: 'fa-briefcase-medical',
  },
  {
    label: 'Blackout Periods',
    route: 'BlackoutPeriodList',
    activeOn: [
      'BlackoutPeriodList',
      'BlackoutPeriodCreate',
      'BlackoutPeriodDetail',
    ],
    activeIcon: 'fa-store-slash',
    inactiveIcon: 'fa-store-slash',
  },
  {
    label: 'Admins',
    route: 'AdminList',
    activeOn: ['AdminList', 'AdminCreate'],
    activeIcon: 'account-tie-hat',
    inactiveIcon: 'account-tie-hat',
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
        <View style={styles.logoImageContainer}>
          <Image
            source={require('@assets/images/logo.png')}
            style={styles.logoImage}
          />
        </View>
      </View>

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
            activeBackgroundColor={theme.colors.surfaceContainerHigh}
            inactiveTintColor={theme.colors.onSurfaceVariant}
            inactiveBackgroundColor={theme.colors.surface}
            style={
              isLastIndex
                ? focused
                  ? {...styles.drawerItemFocused, ...styles.lastDrawerItem}
                  : {...styles.drawerItem, ...styles.lastDrawerItem}
                : focused
                  ? styles.drawerItemFocused
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
      paddingTop: 0,
      backgroundColor: theme.colors.surface,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    logoContainer: {
      width: '100%',
      height: 70,
      paddingVertical: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    logoImageContainer: {
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
    drawerItem: {
      borderRadius: 5,
      color: theme.colors.onSurface,
    },
    drawerItemFocused: {
      borderRadius: 5,
      color: theme.colors.onSurface,
      borderWidth: 1,
      borderColor: theme.colors.surfaceVariant,
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
