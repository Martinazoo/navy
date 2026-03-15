import { IndexStyles } from "../../constants/styles/indexStyles";
import { ThemeColors } from "../../constants/themes";
import FontAwesome5 from "@react-native-vector-icons/fontawesome5";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import React from "react";
import { Pressable, View } from "react-native";
import DropdownSelector from "./DropdownSelector";

interface TopControlsProps {
  styles: IndexStyles;
  themeColors: ThemeColors;
  highContrast: boolean;
  selectedBuilding: string;
  selectedFloor: string;
  showBuildingDropdown: boolean;
  showFloorDropdown: boolean;
  buildingOptions: string[];
  floorOptions: string[];
  onToggleBuildingDropdown: () => void;
  onToggleFloorDropdown: () => void;
  onSelectBuilding: (value: string) => void;
  onSelectFloor: (value: string) => void;
}

export default function TopControls({
  styles,
  themeColors,
  highContrast,
  selectedBuilding,
  selectedFloor,
  showBuildingDropdown,
  showFloorDropdown,
  buildingOptions,
  floorOptions,
  onToggleBuildingDropdown,
  onToggleFloorDropdown,
  onSelectBuilding,
  onSelectFloor,
}: TopControlsProps) {
  return (
    <View style={styles.dropdownRow}>
      <DropdownSelector
        value={selectedBuilding}
        options={buildingOptions}
        isOpen={showBuildingDropdown}
        onToggle={onToggleBuildingDropdown}
        onSelect={onSelectBuilding}
        iconColor={themeColors.primary[950]}
        leftIcon={<FontAwesome5 name="building" size={20} color={themeColors.primary[950]} />}
        containerStyle={styles.dropdownContainer}
        triggerStyle={styles.dropdownTriggerPrimary}
        textStyle={styles.dropdownTextPrimary}
        menuStyle={styles.dropdownMenuPrimary}
        optionStyle={styles.dropdownOption}
        optionTextStyle={styles.dropdownOptionTextPrimary}
      />

      <DropdownSelector
        value={selectedFloor}
        options={floorOptions}
        isOpen={showFloorDropdown}
        onToggle={onToggleFloorDropdown}
        onSelect={onSelectFloor}
        iconColor={highContrast ? themeColors.primary[950] : themeColors.secondary[100]}
        containerStyle={styles.dropdownContainer}
        triggerStyle={styles.dropdownTriggerSecondary}
        textStyle={styles.dropdownTextSecondary}
        menuStyle={styles.dropdownMenuSecondary}
        optionStyle={styles.dropdownOption}
        optionTextStyle={styles.dropdownOptionTextSecondary}
      />

      <Pressable style={({ pressed }) => [styles.connectButton, pressed && styles.connectButtonPressed]}>
        <MaterialIcons name="cast-connected" size={24} color={themeColors.accent[100]} />
      </Pressable>
    </View>
  );
}
