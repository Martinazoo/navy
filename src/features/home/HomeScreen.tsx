import { useTheme } from "../../constants/ThemeContext";
import React, { useMemo, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

import CategoriesPanel from "../../components/bottom/CategoriesPanel";
import SchedulePanel from "../../components/bottom/SchedulePanel";
import SearchPanel from "../../components/bottom/SearchPanel";
import TopControls from "../../components/top/TopControls";

import MaterialIcons from "@react-native-vector-icons/material-icons";

import { scheduleDataTable } from "../../constants/scheduleData";
import { createIndexStyles } from "../../constants/styles/indexStyles";
import { set } from "mobx";

const scheduleData = scheduleDataTable;
const BUILDING_OPTIONS = ["Building A", "Building W", "Building M", "Building C"];
const FLOOR_OPTIONS = ["Floor 0", "Floor 1", "Floor 2", "Floor 3"];

type PanelMode = "search" | "categories" | "schedule";
type CategoryField = "start" | "dest" | null;

export default function Index() {
  const { colors: themeColors, highContrast, fontScale } = useTheme();

  const [start, setStart] = useState("");
  const [dest, setDest] = useState("");
  const [mode, setMode] = useState<PanelMode>("search");
  const [categoryField, setCategoryField] = useState<CategoryField>(null);
  const [selectedBuilding, setSelectedBuilding] = useState(BUILDING_OPTIONS[0]);
  const [selectedFloor, setSelectedFloor] = useState(FLOOR_OPTIONS[0]);
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false);
  const [showFloorDropdown, setShowFloorDropdown] = useState(false);
  const [isNfcPopupVisible, setIsNfcPopupVisible] = useState(false);
  const [nfcPopupMessage, setNfcPopupMessage] = useState("");
  const [nfcMessageIcon, setNfcMessageIcon] = useState("");

  const styles = useMemo(
    () => createIndexStyles(themeColors, highContrast, fontScale),
    [themeColors, highContrast, fontScale]
  );

  const toggleBuildingDropdown = () => {
    setShowBuildingDropdown((prev) => !prev);
    setShowFloorDropdown(false);
  };

  const toggleFloorDropdown = () => {
    setShowFloorDropdown((prev) => !prev);
    setShowBuildingDropdown(false);
  };

  const openCategoryPicker = (field: Exclude<CategoryField, null>) => {
    setCategoryField(field);
    setMode("categories");
  };

  const handleCategorySelect = (label: string) => {
    if (label === "Your Timetable") {
      setMode("schedule");
      return;
    }

    if (categoryField === "start") {
      setStart(label);
    } else if (categoryField === "dest") {
      setDest(label);
    }
    setCategoryField(null);
    setMode("search");
  };

  const handleScheduleSelect = (label: string) => {
    if (categoryField === "start") {
      setStart(label);
    } else if (categoryField === "dest") {
      setDest(label);
    }
    setCategoryField(null);
    setMode("search");
  };

  const handleNFCPress = async () => {
    setNfcPopupMessage("Tap phone to checkpoint");
    setNfcMessageIcon("contactless");
    setIsNfcPopupVisible(true);

    try {
      await NfcManager.start();
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();

      if (tag) {
        setNfcPopupMessage("Successfully scanned");
        setNfcMessageIcon("check-circle");
        setStart("Checkpoint");
        setTimeout(() => {
          setIsNfcPopupVisible(false);
        }, 1500);
      }
    } catch {
      setNfcPopupMessage("Tap phone to checkpoint");
      setNfcMessageIcon("contactless");
    } finally {
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch {
        console.warn("Failed to cancel NFC request");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TopControls
        styles={styles}
        themeColors={themeColors}
        highContrast={highContrast}
        selectedBuilding={selectedBuilding}
        selectedFloor={selectedFloor}
        showBuildingDropdown={showBuildingDropdown}
        showFloorDropdown={showFloorDropdown}
        buildingOptions={BUILDING_OPTIONS}
        floorOptions={FLOOR_OPTIONS}
        onToggleBuildingDropdown={toggleBuildingDropdown}
        onToggleFloorDropdown={toggleFloorDropdown}
        onSelectBuilding={(value) => {
          setSelectedBuilding(value);
          setShowBuildingDropdown(false);
        }}
        onSelectFloor={(value) => {
          setSelectedFloor(value);
          setShowFloorDropdown(false);
        }}
        onNFCPress={handleNFCPress}
      />
      <View style={styles.mapArea} />
      <View style={styles.bottomPanel}>
        {mode === "search" && (
          <SearchPanel
            start={start}
            dest={dest}
            onChangeStart={setStart}
            onChangeDest={setDest}
            onOpenCategoriesStart={() => {
              openCategoryPicker("start");
            }}
            onLocateStart={() => {
              setStart("Current location");
            }}
            onOpenCategoriesDest={() => {
              openCategoryPicker("dest");
            }}
            onExitPress={() => {
              setDest("Nearest Exit");
            }}
          />
        )}
        {mode === "categories" && (
          <CategoriesPanel
            onBack={() => setMode("search")}
            onSelect={handleCategorySelect}
          />
        )}
        {mode === "schedule" && (
          <SchedulePanel
            items={scheduleData}
            onBack={() => setMode("search")}
            onSelect={handleScheduleSelect}
          />
        )}
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={isNfcPopupVisible}
        onRequestClose={() => setIsNfcPopupVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: highContrast ? themeColors.primary[950] : themeColors.secondary[400],
              borderRadius: 14,
              paddingVertical: 18,
              paddingHorizontal: 20,
              width: "100%",
              maxWidth: 320,
              borderWidth: 2,
              borderColor: highContrast ? themeColors.accent[100] : "transparent",
            }}
          >
            <Pressable>
              <MaterialIcons name="close" size={24} color={themeColors.primary[50]} onPress={() => setIsNfcPopupVisible(false)} />
            </Pressable>
            <MaterialIcons name={nfcMessageIcon} size={64} color={themeColors.accent[100]} style={{ alignSelf: "center", marginVertical: 12 }} />
            <Text
              style={{
                color: highContrast ? themeColors.accent[100] : themeColors.primary[50],
                fontSize: 18,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {nfcPopupMessage}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
