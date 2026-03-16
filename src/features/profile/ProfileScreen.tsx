import { COLOR_THEME_LABELS, FONT_SIZE_LABELS, THEME_COLORS } from "../../constants/profileConstants";
import { createProfileStyles } from "../../constants/styles/profileStyles";
import { useTheme } from "../../constants/ThemeContext";
import AntDesign from '@react-native-vector-icons/ant-design';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Octicons from '@react-native-vector-icons/octicons';
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";

export default function Profile() {
  const {
    theme: colorTheme,
    setTheme: setColorTheme,
    colors: themeColors,
    fontSize,
    setFontSize,
    fontScale,
    highContrast,
    setHighContrast,
  } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [audioInstructions, setAudioInstructions] = useState(false);

  const styles = useMemo(
    () => createProfileStyles(themeColors, { fontScale, highContrast }),
    [themeColors, fontScale, highContrast]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Text style={styles.heading}>Settings & Account</Text>
      </View>

      <View >
        <View style={styles.card}>
          <View style={styles.sectionHeaderSection}>
            <View style={styles.sectionIcon}>
              <Octicons name="person" size={24} color={themeColors.primary[50]} />
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Account</Text>
              <Text style={styles.sectionSubtitle}>
                Connect to SEATS for timetable
              </Text>
            </View>
          </View>


          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={themeColors.primary[500]}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor={themeColors.primary[500]}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Pressable style={styles.loginButton} onPress={() => { }}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </Pressable>
        </View>

        <View style={[styles.card, styles.sectionCard]}>
          <View style={styles.sectionHeaderSection}>
            <View style={styles.sectionIcon}>
              <MaterialIcons name="settings" size={24} color={themeColors.primary[50]} />
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Customize</Text>
              <Text style={styles.sectionSubtitle}>
                Customize Colour, Fonts and More
              </Text>
            </View>
          </View>

          <View style={styles.settingRowColumn}>
            <View style={styles.sectionHeaderSection}>
              <View style={styles.subSectionIcon}>
                <AntDesign name="font-size" size={16} color={themeColors.primary[50]} />
              </View>
              <View>
                <Text style={styles.settingLabel}>Font Size</Text>
                <Text style={styles.settingDesc}>Adjust text size for better readability</Text>
              </View>
            </View>
            <View style={styles.fontSizeOptions}>
              {Object.keys(FONT_SIZE_LABELS).map((key) => (
                <Pressable
                  key={key}
                  style={[
                    styles.optionButton,
                    fontSize === key && styles.optionButtonActive,
                  ]}
                  onPress={() => setFontSize(key as keyof typeof FONT_SIZE_LABELS)}
                >
                  <Text
                    style={
                      fontSize === key
                        ? styles.optionTextActive
                        : styles.optionText
                    }
                  >
                    {FONT_SIZE_LABELS[key as keyof typeof FONT_SIZE_LABELS]}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.settingRowColumn}>
            <View style={styles.sectionHeaderSection}>
              <View style={styles.subSectionIcon}>
                <MaterialIcons name="color-lens" size={24} color={themeColors.primary[50]} />
              </View>
              <View>
                <Text style={styles.settingLabel}>Color Theme</Text>
                <Text style={styles.settingDesc}>Choose colors that work best for you</Text>
              </View>
            </View>

            <View style={styles.colorThemeOptions}>
              {Object.keys(COLOR_THEME_LABELS).map((key) => (
                <Pressable
                  key={key}
                  style={[
                    styles.themeButton,
                    colorTheme === key && styles.themeButtonActive,
                  ]}
                  onPress={() =>
                    setColorTheme(key as keyof typeof COLOR_THEME_LABELS)
                  }
                >
                  <View style={styles.themeRow}>
                    <View
                      style={[
                        styles.colorSquare,
                        { backgroundColor: THEME_COLORS[key as keyof typeof THEME_COLORS] },
                      ]}
                    />
                    <Text
                      style={
                        colorTheme === key
                          ? styles.optionTextActive
                          : styles.optionText
                      }
                    >
                      {COLOR_THEME_LABELS[key as keyof typeof COLOR_THEME_LABELS]}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.sectionHeaderSection}>
              <View style={styles.subSectionIcon}>
                <MaterialIcons name="contrast" size={24} color={themeColors.primary[50]} />
              </View>
              <View>
                <Text style={styles.settingLabel}>High Contrast Mode</Text>
                <Text style={styles.settingDesc}> Increase contrast for better visibility</Text>
              </View>
            </View>

            <Switch
              value={highContrast}
              onValueChange={setHighContrast}
              trackColor={{
                false: themeColors.secondary[300],
                true: themeColors.secondary[700],
              }}
              thumbColor={highContrast ? themeColors.secondary[50] : themeColors.primary[800]}
            />
          </View>

          <View style={[styles.settingRow, styles.settingRowLast]}>
            <View style={styles.sectionHeaderSection}>
              <View style={styles.subSectionIcon}>
                <AntDesign name="sound" size={24} color={themeColors.primary[50]} />
              </View>
              <View>
                <Text style={styles.settingLabel}>Audio Instructions</Text>
                <Text style={styles.settingDesc}> Spoken guidance for navigation </Text>
              </View>
            </View>

            <Switch
              value={audioInstructions}
              onValueChange={setAudioInstructions}
              trackColor={{
                false: themeColors.secondary[300],
                true: themeColors.secondary[700],
              }}
              thumbColor={audioInstructions ? themeColors.secondary[50] : themeColors.primary[800]}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>All changes are saved automatically.</Text>
        </View>
      </View>
    </ScrollView>
  );
}