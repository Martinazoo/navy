import FontAwesome5 from "@react-native-vector-icons/fontawesome5";
import React from "react";
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

interface DropdownSelectorProps {
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  iconColor: string;
  leftIcon?: React.ReactNode;
  containerStyle: StyleProp<ViewStyle>;
  triggerStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  menuStyle: StyleProp<ViewStyle>;
  optionStyle: StyleProp<ViewStyle>;
  optionTextStyle: StyleProp<TextStyle>;
}

export default function DropdownSelector({
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  iconColor,
  leftIcon,
  containerStyle,
  triggerStyle,
  textStyle,
  menuStyle,
  optionStyle,
  optionTextStyle,
}: DropdownSelectorProps) {
  return (
    <View style={containerStyle}>
      <Pressable style={triggerStyle} onPress={onToggle}>
        {leftIcon}
        <Text style={textStyle}>{value}</Text>
        <FontAwesome5 name={isOpen ? "caret-up" : "caret-down"} size={24} iconStyle="solid" color={iconColor} />
      </Pressable>
      {isOpen && (
        <View style={menuStyle}>
          {options.map((option, index) => (
            <Pressable
              key={option}
              style={[optionStyle, index === 0 && { borderTopWidth: 0 }]}
              onPress={() => onSelect(option)}
            >
              <Text style={optionTextStyle}>{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
