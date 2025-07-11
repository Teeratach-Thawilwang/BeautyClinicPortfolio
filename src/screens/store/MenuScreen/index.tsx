import React from 'react'
import {Image, ScrollView, View} from 'react-native'
import {Switch} from 'react-native-paper'

import Button from '@components/Button'
import MenuCard from '@components/MenuCard'
import MenuCardItem from '@components/MenuCardItem'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {ThemeEnum} from '@models/ThemeTypes'
import AuthService from '@services/AuthService'

import ProfileMenuCard from './Components/ProfileMenuCard'
import {getStyles} from './styles'

export default function MenuScreen() {
  const navigation = useNavigate()
  const {theme, schema, toggleTheme} = useTheme()
  const {isAdmin, user} = AuthService.getState()
  const styles = getStyles(theme, user != null)

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'>
      <View style={styles.logoContainer}>
        <Image
          source={require('@assets/images/logo.png')}
          style={styles.logoImage}
        />
      </View>
      {user ? (
        <ProfileMenuCard
          name={user.user_metadata.name}
          email={user.email!}
          containerStyle={{marginTop: 20}}
        />
      ) : null}

      <MenuCard containerStyle={{marginTop: 20}}>
        {user ? (
          <MenuCardItem
            label='Order History'
            icon='ion-bag-handle-sharp'
            onPress={() => {
              navigation.navigate('OrderHistoryScreen')
            }}
          />
        ) : null}
        <MenuCardItem
          label='Change Theme'
          icon='ion-color-palette'
          rightElement={
            <Switch
              thumbColor={theme.colors.surfaceVariant}
              trackColor={{
                true: theme.colors.onSurfaceVariant,
                false: theme.colors.onSurfaceVariant,
              }}
              value={schema == ThemeEnum.Light}
              onValueChange={toggleTheme}
            />
          }
        />
      </MenuCard>

      {isAdmin ? (
        <MenuCard containerStyle={{marginVertical: 20}}>
          <MenuCardItem
            label='Backoffice'
            icon='database-cog'
            onPress={() =>
              navigation.navigate('BackOfficeScreens', {screen: 'Dashboard'})
            }
          />
        </MenuCard>
      ) : null}

      {user ? (
        <Button
          mode='outlined'
          onPress={() => AuthService.signOut()}
          containerStyle={{
            marginTop: 'auto',
            marginBottom: 20,
            borderRadius: 50,
            borderColor: theme.colors.error,
          }}
          labelStyle={{
            fontSize: theme.fontSize.label,
            color: theme.colors.error,
          }}>
          Sign out
        </Button>
      ) : (
        <Button
          mode='outlined'
          onPress={() => navigation.navigate('SignInScreen')}
          containerStyle={{
            marginTop: 'auto',
            marginBottom: 20,
            borderRadius: 50,
          }}
          labelStyle={{
            fontSize: theme.fontSize.label,
          }}>
          Sign in / Sign up
        </Button>
      )}
    </ScrollView>
  )
}
