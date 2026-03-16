import { createBottomStyles } from "../constants/styles/bottomStyles";
import { useTheme } from "../constants/ThemeContext";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

export interface ScheduleEntry {
  id: string;
  title: string;
  room: string;
  building: string;
  floor: string;
  day: string;
  time: string;
}

interface ScheduleItemProps {
  item: ScheduleEntry;
  onPress: (title: string) => void;
}

export default function ScheduleItem({ item, onPress }: ScheduleItemProps) {
  const { colors: themeColors, fontScale, highContrast } = useTheme();
  const styles = useMemo(
    () => createBottomStyles(themeColors, { fontScale, highContrast }),
    [themeColors, fontScale, highContrast]
  );

  return (
    <Pressable
      style={styles.scheduleItem}
      onPress={() => onPress(item.title)}
    >
      <View style={{ flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
        <Text style={styles.scheduleTitle}>{item.title}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
          <View style={{ marginBottom: 4 }}>
            <Text style={styles.scheduleTime}>{item.day}</Text>
            <Text style={styles.scheduleTime}>{item.time}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.scheduleSubtitle}>{item.room}</Text>
            <Text style={styles.scheduleSubtitle}>{item.building}</Text>
            <Text style={styles.scheduleSubtitle}>{item.floor}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}