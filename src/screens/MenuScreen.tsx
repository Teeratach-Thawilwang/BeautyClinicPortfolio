import React from 'react'
import {Image, ScrollView, View} from 'react-native'
import {Switch, Text} from 'react-native-paper'

import Button from '@components/Button'
import Card from '@components/Card'
import CardContent from '@components/CardContent'
import CardLink from '@components/CardLink'
import CardTextAction from '@components/CardTextAction'
import Header from '@components/Header'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {ThemeEnum} from '@models/ThemeInterface'
import AdminService from '@services/AdminService'
import AuthenticationService from '@services/AuthenticationService'
import getStyles from '@styles/MenuScreenStyle'

export default function MenuScreen() {
  const {theme, schema, toggleTheme} = useTheme()
  const navigation = useNavigate()
  const user = AuthenticationService.getUser()
  const isAdmin = AdminService.getIsAdmin()
  const styles = getStyles(theme, user != null)

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'>
      <Header name='Menu' allowBack={false} />
      {user ? (
        <Card>
          <CardContent style={styles.flexRowContainer}>
            <Image
              source={require('@assets/avatar-icon.png')}
              style={styles.profileImage}
            />
            <View style={styles.profileTextContainer}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.ProfileName}>
                {user?.user_metadata.name}
              </Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.ProfileEmail}>
                Email: {user?.email}
              </Text>
            </View>
          </CardContent>
        </Card>
      ) : (
        <Button
          onPress={() => navigation.navigate('SignInScreen')}
          styles={{container: styles.signInContainer}}>
          SignIn / SignUp
        </Button>
      )}

      <Card>
        <CardLink icon='ion-bag-handle-sharp' onPress={() => {}}>
          Order History
        </CardLink>
        <CardTextAction icon='ion-color-palette' text='Change Theme'>
          <Switch value={schema == ThemeEnum.Light} onValueChange={toggleTheme} />
        </CardTextAction>
      </Card>

      {isAdmin ? (
        <Card>
          <CardLink
            icon='database-cog'
            onPress={() => navigation.navigate('BackOffice', {screen: 'Dashboard'})}>
            Backoffice
          </CardLink>
        </Card>
      ) : (
        <></>
      )}

      {user ? (
        <Card style={styles.cardSignOut}>
          <Button
            mode='text'
            onPress={() => AuthenticationService.signOut()}
            styles={{container: styles.signOutContainer, label: styles.signOutLabel}}>
            Sign out
          </Button>
        </Card>
      ) : (
        <></>
      )}
    </ScrollView>
  )
}
