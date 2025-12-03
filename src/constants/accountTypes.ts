/**
 * Account type icon mapping
 * Maps account types to Ionicons icon names
 */
export const ACCOUNT_TYPE_ICONS: Record<string, string> = {
  'Cash': 'cash-outline',
  'Bank': 'business-outline', 
  'E-Wallet': 'wallet-outline',
  'Credit Card': 'card-outline',
  'Investment': 'trending-up-outline',
  'Savings': 'shield-checkmark-outline',
  'Other': 'ellipse-outline'
}

/**
 * Account type colors for visual distinction
 */
export const ACCOUNT_TYPE_COLORS: Record<string, { bg: string; accent: string }> = {
  'Cash': { bg: '#E8F5E9', accent: '#4CAF50' },
  'Bank': { bg: '#E3F2FD', accent: '#2196F3' },
  'E-Wallet': { bg: '#FFF3E0', accent: '#FF9800' },
  'Credit Card': { bg: '#FCE4EC', accent: '#E91E63' },
  'Investment': { bg: '#E8EAF6', accent: '#3F51B5' },
  'Savings': { bg: '#E0F2F1', accent: '#009688' },
  'Other': { bg: '#F5F5F5', accent: '#9E9E9E' }
}

/**
 * Get icon name for account type
 */
export const getAccountTypeIcon = (type: string): string => {
  return ACCOUNT_TYPE_ICONS[type] || ACCOUNT_TYPE_ICONS['Other']
}

/**
 * Get colors for account type
 */
export const getAccountTypeColors = (type: string) => {
  return ACCOUNT_TYPE_COLORS[type] || ACCOUNT_TYPE_COLORS['Other']
}
