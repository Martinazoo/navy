import { createBottomStyles } from "../../constants/styles/bottomStyles";
import { useTheme } from "../../constants/ThemeContext";
import AntDesign from "@react-native-vector-icons/ant-design";
import FontAwesome5 from "@react-native-vector-icons/fontawesome5";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { useMemo } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface SearchPanelProps {
  start: string;
  dest: string;
  onChangeStart: (text: string) => void;
  onChangeDest: (text: string) => void;
  onOpenCategoriesStart: () => void;
  onOpenCategoriesDest: () => void;
  onLocateStart?: () => void;
  onExitPress?: () => void;
}

export default function SearchPanel({
  start,
  dest,
  onChangeStart,
  onChangeDest,
  onOpenCategoriesStart,
  onOpenCategoriesDest,
  onLocateStart = () => {},
  onExitPress = () => {  },
}: SearchPanelProps) {
  const { colors: themeColors, fontScale, highContrast } = useTheme();
  const styles = useMemo(
    () => createBottomStyles(themeColors, { fontScale, highContrast }),
    [themeColors, fontScale, highContrast]
  );
  return (
    <>
      <Text style={styles.label}>Where do you want to start?</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter Start Point"
          placeholderTextColor={highContrast ? themeColors.primary[900] : themeColors.secondary[400]}
          value={start}
          onChangeText={onChangeStart}
        />
        <Pressable
          style={({ pressed }) => [
            styles.secondaryIconButton,
            pressed && { backgroundColor: highContrast ? themeColors.primary[700] : themeColors.accent[700] },
          ]}
          onPress={onLocateStart}
        >
          <AntDesign name="aim" size={24} color={themeColors.secondary[50]} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.primaryIconButton,
            pressed && { backgroundColor: highContrast ? themeColors.primary[700] : themeColors.primary[600] },
          ]}
          onPress={onOpenCategoriesStart}
        >
          <MaterialIcons name="category" size={24} color={themeColors.secondary[50]} />
        </Pressable>
      </View>

      <Text style={[styles.label, { marginTop: 16 }]}>Where do you want to go?</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter Destination"
          placeholderTextColor={highContrast ? themeColors.primary[900] : themeColors.secondary[400]}
          value={dest}
          onChangeText={onChangeDest}
        />
        <Pressable
          style={({ pressed }) => [
            styles.primaryIconButton,
            pressed && { backgroundColor: highContrast ? themeColors.primary[700] : themeColors.primary[600] },
          ]}
          onPress={onOpenCategoriesDest}
        >
          <MaterialIcons name="category" size={24} color={themeColors.secondary[50]} />
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && { backgroundColor: highContrast ? themeColors.primary[700] : themeColors.accent[700] },
        ]}
        onPress={onExitPress}
      >
        <Text style={styles.primaryButtonText}>Find nearest exit</Text>
        <FontAwesome5 name="door-open" iconStyle="solid" size={24} color={themeColors.accent[50]} />
      </Pressable>
    </>
  );
}