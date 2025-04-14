import React, {ComponentType} from 'react'

import {useResponsiveScreen} from '@hooks/CommonHooks'

type Props<T extends object, K extends object> = {
  commonProps: T & K
  mobileProps?: Partial<T>
  tabletProps?: Partial<K>
  mobile: ComponentType<T>
  tablet: ComponentType<K>
}

export default function ResponsiveSwitcher<T extends object, K extends object>(
  props: Props<T, K>,
) {
  const {responsive} = useResponsiveScreen()
  const RenderComponent = responsive === 'MOBILE' ? props.mobile : props.tablet
  const specificProps =
    responsive === 'MOBILE' ? props.mobileProps : props.tabletProps

  return <RenderComponent {...props.commonProps} {...specificProps} />
}
