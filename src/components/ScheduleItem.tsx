import React from "react";
import { Pressable, Text, View } from "react-native";
import { bottomStyles } from "../constants/bottomStyles";

export interface ScheduleEntry {
  id: string;
  title: string;
  subtitle: string;
  day: string;
  time: string;
}

interface ScheduleItemProps {
  item: ScheduleEntry;
  onPress: (title: string) => void;
}

export default function ScheduleItem({ item, onPress }: ScheduleItemProps) {
  return (
    <Pressable
      style={bottomStyles.scheduleItem}
      onPress={() => onPress(item.title)}
    >
      <View style={{ marginBottom: 4 }}>
        <Text style={bottomStyles.scheduleTitle}>{item.title}</Text>
        <Text style={bottomStyles.scheduleSubtitle}>{item.subtitle}</Text>
      </View>
      <View style={{alignItems: "flex-end"}}>
        <Text style={bottomStyles.scheduleTime}>{item.day}</Text>
        <Text style={bottomStyles.scheduleTime}>{item.time}</Text>
      </View>
    </Pressable>
  );
}