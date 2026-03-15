import { createBottomStyles } from "../../constants/styles/bottomStyles";
import { useTheme } from "../../constants/ThemeContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ScheduleItem, { ScheduleEntry } from "../ScheduleItem";

export type { ScheduleEntry };

interface SchedulePanelProps {
  items: ScheduleEntry[];
  onBack: () => void;
  onSelect: (label: string) => void;
}

export default function SchedulePanel({ items, onBack, onSelect }: SchedulePanelProps) {
  const { colors: themeColors, fontScale, highContrast } = useTheme();
  const styles = useMemo(
    () => createBottomStyles(themeColors, { fontScale, highContrast }),
    [themeColors, fontScale, highContrast]
  );

  return (
    <>
      <View style={styles.categoriesHeader}>
        <Pressable onPress={onBack}>
          <Ionicons
            name="chevron-back"
            size={32}
            color={highContrast ? themeColors.primary[950] : themeColors.secondary[50]}
          />
        </Pressable>
        <Text style={styles.categoriesTitle}>Your Timetable</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={{height: 205}}>
        {items.map(item => (
        <ScheduleItem key={item.id} item={item} onPress={onSelect} />
      ))}
      </ScrollView>
    
    </>
  );
}