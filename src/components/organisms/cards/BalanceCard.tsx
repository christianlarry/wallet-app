import { Animated, Platform, Pressable, StyleSheet, View } from "react-native"
import Card from "../../molecules/Card"
import AppText from "../../atoms/AppText"
import { useStore } from "../../../store/useStore"
import { COLORS, SPACING } from "../../../constants/themes"
import { formatRupiah } from "../../../utils/currencyFormatter"
import Icon from "../../atoms/Icon"
import { Ionicons } from "@expo/vector-icons"
import IconButton from "../../atoms/IconButton"
import { Button } from "../../atoms/Button"
import { useNavigation } from "@react-navigation/native"
import { BlurView } from "expo-blur"

interface BalanceCardProps {
  scrollY?: Animated.Value
  stickyThreshold?: number
}

const BalanceCard = ({
  scrollY,
  stickyThreshold = 0
}: BalanceCardProps) => {

  const { totalNetWorth, isBalanceVisible, toggleBalanceVisibility } = useStore()
  const navigation = useNavigation<any>()

  const handleAddTransactionBtnPress = () => {
    navigation.navigate("AddTransaction")
  }

  const inputRange = [stickyThreshold, stickyThreshold + 50];

  // Target: Saat sticky, background harus hampir transparan (0.1)
  // agar BlurView di belakangnya yang mengambil alih visual 'kaca'nya.
  // Jika terlalu putih (misal 0.8), efek blur konten di belakangnya tidak akan kelihatan.
  const backgroundColor = scrollY ? scrollY.interpolate({
    inputRange,
    outputRange: [COLORS.white, 'rgba(255, 255, 255, 0.01)'],
    extrapolate: 'clamp'
  }) : COLORS.white;

  // BlurView Opacity
  // Saat posisi normal: Opacity 0 (tidak ada blur, murni putih solid dari variabel backgroundColor diatas)
  // Saat sticky: Opacity 1 (Blur aktif penuh)
  const blurOpacity = scrollY ? scrollY.interpolate({
    inputRange,
    outputRange: [0, 1],
    extrapolate: 'clamp'
  }) : 0;

  // Opsional: Tambahkan Border tipis saat mode kaca agar kontras dengan konten di belakangnya
  const borderColor = scrollY ? scrollY.interpolate({
    inputRange,
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)'],
    extrapolate: 'clamp'
  }) : 'transparent';

  return (
    <Animated.View style={[
      styles.container,
      {
        backgroundColor,
        borderColor,
        borderWidth: 1.5,
        overflow: 'hidden'
      }
    ]}>

      {/* Blur Layer
          Layer ini ada di posisi 'absolute' paling belakang.
          intensity={40} biasanya cukup untuk efek frosted glass yang elegan (tidak terlalu buram, tidak terlalu bening).
      */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: blurOpacity }]}>
        <BlurView
          intensity={Platform.OS === 'ios' ? 80 : 50}
          tint="systemChromeMaterialLight"
          style={StyleSheet.absoluteFill} 
          experimentalBlurMethod="dimezisBlurView"
        />
      </Animated.View>

      {/* Card Content */}
      <Card style={styles.cardOverride}>
        <View style={styles.contentWrapper}>
          <AppText variant='body' color='mutedForeground' adjustsFontSizeToFit>Your balance</AppText>

          <Pressable style={styles.balanceWrapper} onPress={() => toggleBalanceVisibility()}>
            <AppText variant='header' style={styles.balanceText}>
              {isBalanceVisible ? formatRupiah(totalNetWorth) : '••••••••'}
            </AppText>

            <IconButton variant="ghost" onPress={() => toggleBalanceVisibility()}>
              <Icon>
                <Ionicons name={isBalanceVisible ? "eye-off-outline" : "eye-outline"} />
              </Icon>
            </IconButton>
          </Pressable>

          <Button
            title="Add Transaction"
            onPress={handleAddTransactionBtnPress}
          />
        </View>
      </Card>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden'
  },
  cardOverride: {
    backgroundColor: 'transparent'
  },
  contentWrapper: {
    flexDirection: 'column',
    gap: SPACING.xs
  },
  balanceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  balanceText: {
    flex: 1
  }
})

export default BalanceCard