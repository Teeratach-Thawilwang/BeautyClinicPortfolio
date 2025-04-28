import Button from '@components/Button'
import {googleSignInHandler, useNavigate} from '@hooks/CommonHooks'

import {getStyles} from './styles'

export default function GoogleSignInButton() {
  const styles = getStyles()
  const navigation = useNavigate()
  return (
    <Button
      onPress={async () => await googleSignInHandler(navigation)}
      imageIcon={require('@assets/images/google_icon.png')}
      containerStyle={styles.container}
      labelStyle={styles.label}
      imageStyle={styles.icon}
      useLoading={true}>
      Sign In with Google
    </Button>
  )
}
