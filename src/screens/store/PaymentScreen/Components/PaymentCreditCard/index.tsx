import React from 'react'
import {Controller} from 'react-hook-form'
import {View} from 'react-native'

import JcbIcon from '@assets/images/jcb.svg'
import MasterCardIcon from '@assets/images/master_card.svg'
import VisaIcon from '@assets/images/visa.svg'
import Button from '@components/Button'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {useCardForm} from '@hooks/store/OrderHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function PaymentCreditCard({amount, onSubmit, disabled}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {control, handleSubmit, errors} = useCardForm()

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <VisaIcon width={59} height={35} />
        <MasterCardIcon width={59} height={35} />
        <JcbIcon width={59} height={35} />
      </View>
      <View style={styles.form}>
        <Controller
          control={control}
          name='name'
          render={({field: {onChange, value}}) => (
            <TextInput
              mode='labelTop'
              label='ชื่อเจ้าของบัตร'
              value={value ? String(value) : ''}
              disabled={disabled}
              onChange={onChange}
              error={errors.name?.message}
              errorStyle={styles.error}
            />
          )}
        />
        <Controller
          control={control}
          name='number'
          render={({field: {onChange, value}}) => (
            <TextInput
              mode='labelTop'
              label='หมายเลขบัตร'
              keyboardType='number-pad'
              maxLength={19}
              disabled={disabled}
              value={value ? String(value) : ''}
              onChange={onChange}
              error={errors.number?.message}
              errorStyle={styles.error}
            />
          )}
        />
        <View style={styles.flexContainer}>
          <Controller
            control={control}
            name='expiration'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                label='Expired (MM/YYYY)'
                keyboardType='number-pad'
                value={value ? String(value) : ''}
                maxLength={7}
                disabled={disabled}
                onChange={onChange}
                onChangeInject={text => {
                  if (text.length == 2 && !text.includes('/')) {
                    return text + '/'
                  }
                  if (text.indexOf('/') > 2) {
                    const [mm, yyyy] = text.split('/')
                    return mm.slice(0, 2) + '/' + yyyy
                  }
                  return text
                }}
                error={errors.expiration?.message}
                containerStyle={styles.expiredInputContainer}
                errorStyle={styles.error}
              />
            )}
          />
          <Controller
            control={control}
            name='securityCode'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                label='CVV'
                value={value ? String(value) : ''}
                maxLength={4}
                disabled={disabled}
                onChange={onChange}
                error={errors.securityCode?.message}
                containerStyle={styles.cvvInputContainer}
                errorStyle={styles.error}
              />
            )}
          />
        </View>
      </View>
      {disabled ? null : (
        <Button
          useLoading={true}
          onPress={handleSubmit(onSubmit)}
          containerStyle={styles.buttonContainer}>
          {`ดำเนินการชำระ ฿${amount.toFixed(2)}`}
        </Button>
      )}
    </View>
  )
}
