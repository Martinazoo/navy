import { useTheme } from "../../constants/ThemeContext";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

import CategoriesPanel from "../../components/bottom/CategoriesPanel";
import SchedulePanel from "../../components/bottom/SchedulePanel";
import SearchPanel from "../../components/bottom/SearchPanel";
import TopControls from "../../components/top/TopControls";

import { scheduleDataTable } from "../../constants/scheduleData";
import { createIndexStyles } from "../../constants/styles/indexStyles";

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
    </View>
  );
}
