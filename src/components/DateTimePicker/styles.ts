import {getDefaultStyles} from 'react-native-ui-datepicker'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const defaultStyles = getDefaultStyles()
  return {
    ...defaultStyles,
    header: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      height: 50,
    },
    weekdays: {
      // height: 20,
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
    },
    weekday_label: {color: theme.colors.primary},
    month_selector_label: {color: theme.colors.onSurface},
    year_selector_label: {color: theme.colors.onSurface},

    day: {borderRadius: 50},
    day_label: {color: theme.colors.onSurface},
    days: {backgroundColor: theme.colors.surfaceContainerHigh},
    // Current day
    today: {backgroundColor: theme.colors.surfaceContainerLow},
    today_label: {color: theme.colors.onSurface},
    // Active day
    selected: {backgroundColor: theme.colors.primary},
    selected_label: {color: theme.colors.onPrimary},
    // Range
    range_fill: {
      backgroundColor: theme.colors.primaryContainer,
      marginTop: 2,
      marginBottom: 1.5,
    },

    month: {borderRadius: 50},
    month_label: {color: theme.colors.onSurface},
    months: {backgroundColor: theme.colors.surfaceContainerHigh},
    month_selector: {marginRight: 20},
    // Active month
    selected_month: {backgroundColor: theme.colors.primary},
    selected_month_label: {color: theme.colors.onPrimary},

    year: {borderRadius: 50},
    year_label: {color: theme.colors.onSurface},
    years: {backgroundColor: theme.colors.surfaceContainerHigh},
    // Current year
    selected_year: {backgroundColor: theme.colors.surfaceContainerHighest},
    selected_year_label: {color: theme.colors.onSurface},
    // Active year
    active_year: {backgroundColor: theme.colors.primary},
    active_year_label: {color: theme.colors.onPrimary},
  }
}
