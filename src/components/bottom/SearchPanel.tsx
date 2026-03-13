import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import AntDesign from "@react-native-vector-icons/ant-design";
import FontAwesome5 from "@react-native-vector-icons/fontawesome5";
import { bottomStyles } from "../../constants/bottomStyles";
import { colors } from "../../constants/colours";

interface SearchPanelProps {
  start: string;
  dest: string;
  onChangeStart: (text: string) => void;
  onChangeDest: (text: string) => void;
  onPressFind: () => void;
  onOpenCategoriesStart: () => void;
  onOpenCategoriesDest: () => void;
  onLocateStart?: () => void;
}

export default function SearchPanel({
  start,
  dest,
  onChangeStart,
  onChangeDest,
  onPressFind,
  onOpenCategoriesStart,
  onOpenCategoriesDest,
  onLocateStart = () => {},
}: SearchPanelProps) {
  return (
    <>
      <Text style={bottomStyles.label}>Where do you want to start?</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TextInput
          style={[bottomStyles.input, { flex: 1 }]}
          placeholder="Enter Start Point"
          placeholderTextColor={colors.secondary[400]}
          value={start}
          onChangeText={onChangeStart}
        />
        <Pressable
          style={({ pressed }) => [
            bottomStyles.secondaryIconButton,
            pressed && { backgroundColor: colors["oriental-pink"][700] },
          ]}
          onPress={onLocateStart}
        >
          <AntDesign name="aim" size={24} color={colors["oriental-pink"][50]} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            bottomStyles.primaryIconButton,
            pressed && { backgroundColor: colors.primary[600] },
          ]}
          onPress={onOpenCategoriesStart}
        >
          <MaterialIcons name="category" size={24} color={colors.secondary[50]} />
        </Pressable>
      </View>

      <Text style={[bottomStyles.label, { marginTop: 16 }]}>Where do you want to go?</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TextInput
          style={[bottomStyles.input, { flex: 1 }]}
          placeholder="Enter Destination"
          placeholderTextColor={colors.secondary[400]}
          value={dest}
          onChangeText={onChangeDest}
        />
        <Pressable
          style={({ pressed }) => [
            bottomStyles.primaryIconButton,
            pressed && { backgroundColor: colors.primary[600] },
          ]}
          onPress={onOpenCategoriesDest}
        >
          <MaterialIcons name="category" size={24} color={colors.secondary[50]} />
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          bottomStyles.primaryButton,
          pressed && { backgroundColor: colors["oriental-pink"][700] },
        ]}
        onPress={onPressFind}
      >
        <Text style={bottomStyles.primaryButtonText}>Find nearest exit</Text>
        <FontAwesome5 iconStyle="solid" name="door-open" size={24} color={colors["oriental-pink"][50]} />
      </Pressable>
    </>
  );
}