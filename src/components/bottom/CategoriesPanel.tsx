import { createBottomStyles } from "../../constants/styles/bottomStyles";
import { useTheme } from "../../constants/ThemeContext";
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

interface CategoryItem {
  lib: "fa" | "material";
  icon: string;
  label: string;
}

interface CategoriesPanelProps {
  onBack: () => void;
  onSelect: (label: string) => void;
}

const ITEMS: CategoryItem[] = [
  { lib: "fa", icon: "calendar", label: "Your Timetable" },
  { lib: "fa", icon: "restroom", label: "Restroom" },
  { lib: "material", icon: "coffee", label: "Food & Drinks" },
  { lib: "material", icon: "elevator", label: "Elevator" },
];

export default function CategoriesPanel({ onBack, onSelect }: CategoriesPanelProps) {
  const { colors: themeColors, fontScale, highContrast } = useTheme();
  const styles = useMemo(
    () => createBottomStyles(themeColors, { fontScale, highContrast }),
    [themeColors, fontScale, highContrast]
  );

  return (
    <>
      <View style={styles.categoriesHeader}>
        <Pressable onPress={onBack}>
          <MaterialIcons
            name="chevron-left"
            size={32}
            color={highContrast ? themeColors.primary[950] : themeColors.secondary[50]}
          />
        </Pressable>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.categoryGrid}>
        {ITEMS.map((item) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
                        styles.categoryCard,
                        pressed && { backgroundColor: themeColors.secondary[100] },
                      ]}
            onPress={() => onSelect(item.label)}
          >
            {item.lib === "fa" ? (
              <FontAwesome5 name={item.icon as any} size={32} color={themeColors.primary[800]} />
            ) : (
              <MaterialIcons name={item.icon as any} size={32} color={themeColors.primary[800]} />
            )}
            <Text style={styles.categoryLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}