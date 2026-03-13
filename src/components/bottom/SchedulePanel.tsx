import React from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { bottomStyles } from "../../constants/bottomStyles";
import { colors } from "../../constants/colours";
import ScheduleItem, { ScheduleEntry } from "../ScheduleItem";

export type { ScheduleEntry };

interface SchedulePanelProps {
  items: ScheduleEntry[];
  onBack: () => void;
  onSelect: (label: string) => void;
}

export default function SchedulePanel({ items, onBack, onSelect }: SchedulePanelProps) {
  return (
    <>
      <View style={bottomStyles.categoriesHeader}>
        <Pressable onPress={onBack}>
          <Ionicons name="chevron-back" size={32} color={colors.secondary[50]} />
        </Pressable>
        <Text style={bottomStyles.categoriesTitle}>Your Timetable</Text>
        <View style={{ width: 24 }} />
      </View>
      {items.map(item => (
        <ScheduleItem key={item.id} item={item} onPress={onSelect} />
      ))}
    </>
  );
}