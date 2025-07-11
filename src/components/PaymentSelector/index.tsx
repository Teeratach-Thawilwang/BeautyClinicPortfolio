import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {List} from 'react-native-paper'

import BayIcon from '@assets/images/bay.svg'
import BblIcon from '@assets/images/bbl.svg'
import JcbIcon from '@assets/images/jcb.svg'
import KplusIcon from '@assets/images/kplus.svg'
import KtbIcon from '@assets/images/ktb.svg'
import MasterCardIcon from '@assets/images/master_card.svg'
import ScbIcon from '@assets/images/scb.svg'
import VisaIcon from '@assets/images/visa.svg'
import Checkbox from '@components/Checkbox'
import {useTheme} from '@context-providers/ThemeProvider'
import {PaymentMethod} from '@enums/PaymentEnums'

import {getStyles} from './styles'
import {Props} from './types'

export default function PaymentSelector({onChange}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [selector, setSelector] = useState<PaymentMethod | undefined>(undefined)
  const [expandGroup1, setExpandGroup1] = useState(true)
  const [expandGroup2, setExpandGroup2] = useState(true)

  function onPressCheckbox(type: PaymentMethod) {
    let select: PaymentMethod | undefined = type
    if (selector === type) {
      select = undefined
    }
    setSelector(select)
    onChange(select)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Checkbox
        label='QR Promptpay'
        status={
          selector === PaymentMethod.QR_PROMPTPAY ? 'checked' : 'unchecked'
        }
        onPress={() => onPressCheckbox(PaymentMethod.QR_PROMPTPAY)}
        containerStyle={styles.checkbox}
      />
      <List.Accordion
        title='Credit Card / Debit Card'
        expanded={expandGroup1}
        onPress={() => setExpandGroup1(val => !val)}
        style={styles.accordionContainer}
        titleStyle={styles.accordionTitle}>
        <Checkbox
          label='Visa / Master Card / JCB'
          status={
            selector === PaymentMethod.CREDIT_CARD ? 'checked' : 'unchecked'
          }
          onPress={() => onPressCheckbox(PaymentMethod.CREDIT_CARD)}
          containerStyle={[styles.checkbox, styles.checkboxMarginLeft]}>
          <View style={styles.creditCardImageContainer}>
            <VisaIcon width={40.5} height={24} />
            <MasterCardIcon width={40.5} height={24} />
            <JcbIcon width={40.5} height={24} />
          </View>
        </Checkbox>
      </List.Accordion>
      <List.Accordion
        title='Mobile Banking'
        expanded={expandGroup2}
        onPress={() => setExpandGroup2(val => !val)}
        style={styles.accordionContainer}
        titleStyle={styles.accordionTitle}>
        <Checkbox
          label='K Plus'
          status={selector === PaymentMethod.K_PLUS ? 'checked' : 'unchecked'}
          onPress={() => onPressCheckbox(PaymentMethod.K_PLUS)}
          containerStyle={[styles.checkbox, styles.checkboxMarginLeft]}>
          <View style={styles.mobileImageContainer}>
            <KplusIcon width={25} height={25} />
          </View>
        </Checkbox>
        <Checkbox
          label='SCB Easy'
          status={selector === PaymentMethod.SCB_EASY ? 'checked' : 'unchecked'}
          onPress={() => onPressCheckbox(PaymentMethod.SCB_EASY)}
          containerStyle={[styles.checkbox, styles.checkboxMarginLeft]}>
          <View style={styles.mobileImageContainer}>
            <ScbIcon width={25} height={25} />
          </View>
        </Checkbox>
        <Checkbox
          label='Krungthai Next'
          status={
            selector === PaymentMethod.KRUNGTHAI_NEXT ? 'checked' : 'unchecked'
          }
          onPress={() => onPressCheckbox(PaymentMethod.KRUNGTHAI_NEXT)}
          containerStyle={[styles.checkbox, styles.checkboxMarginLeft]}>
          <View style={styles.mobileImageContainer}>
            <KtbIcon width={25} height={25} />
          </View>
        </Checkbox>
        <Checkbox
          label='Bualuang'
          status={selector === PaymentMethod.BUALUANG ? 'checked' : 'unchecked'}
          onPress={() => onPressCheckbox(PaymentMethod.BUALUANG)}
          containerStyle={[styles.checkbox, styles.checkboxMarginLeft]}>
          <View style={styles.mobileImageContainer}>
            <BblIcon width={25} height={25} />
          </View>
        </Checkbox>
        <Checkbox
          label='Krungsri'
          status={selector === PaymentMethod.KRUNGSRI ? 'checked' : 'unchecked'}
          onPress={() => onPressCheckbox(PaymentMethod.KRUNGSRI)}
          containerStyle={[styles.checkbox, styles.checkboxMarginLeft]}>
          <View style={styles.mobileImageContainer}>
            <BayIcon width={25} height={25} />
          </View>
        </Checkbox>
      </List.Accordion>
    </View>
  )
}
