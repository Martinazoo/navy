import React from "react";
import { View, Text, Pressable } from "react-native";
import FontAwesome5 from "@react-native-vector-icons/fontawesome5";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { bottomStyles } from "../../constants/bottomStyles";
import { colors } from "../../constants/colours";
interface CategoryItem {
  lib: "fa" | "material";
  icon: string;
  label: string;
  iconStyle?: "regular" | "solid" | "brand";
}

interface CategoriesPanelProps {
  onBack: () => void;
  onSelect: (label: string) => void;
}

const ITEMS: CategoryItem[] = [
  { lib: "fa", icon: "calendar", label: "Your Timetable" },
  { lib: "fa", icon: "toilet", label: "Restroom", iconStyle: "solid" },
  { lib: "material", icon: "coffee", label: "Coffee" },
  { lib: "material", icon: "elevator", label: "Elevator" },
];

export default function CategoriesPanel({ onBack, onSelect }: CategoriesPanelProps) {
  return (
    <>
      <View style={bottomStyles.categoriesHeader}>
        <Pressable onPress={onBack}>
          <MaterialIcons name="chevron-left" size={32} color={colors.secondary[50]} />
        </Pressable>
        <Text style={bottomStyles.categoriesTitle}>Categories</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={bottomStyles.categoryGrid}>
        {ITEMS.map((item) => (
          <Pressable
            key={item.label}
            style={bottomStyles.categoryCard}
            onPress={() => onSelect(item.label)}
          >
            {item.lib === "fa" ? (
              <FontAwesome5
                name={item.icon as any}
                size={32}
                color={colors.primary[800]}
                iconStyle={item.iconStyle}
              />
            ) : (
              <MaterialIcons name={item.icon as any} size={32} color={colors.primary[800]} />
            )}
            <Text style={bottomStyles.categoryLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}