import { colors } from "../../constants/colours";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import SearchPanel from "../../components/bottom/SearchPanel";
import CategoriesPanel from "../../components/bottom/CategoriesPanel";
import SchedulePanel from "../../components/bottom/SchedulePanel";

import { scheduleDataTable } from "../../constants/scheduleData";

const scheduleData = scheduleDataTable;

export default function Index() {
  const [start, setStart] = useState("");
  const [dest, setDest] = useState("");
  const [mode, setMode] = useState<"search" | "categories" | "schedule">("search");
  const [categoryField, setCategoryField] = useState<"start" | "dest" | null>(null);

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
      <View style={styles.mapArea} />
      <View style={styles.bottomPanel}>
        {mode === "search" && (
          <SearchPanel
            start={start}
            dest={dest}
            onChangeStart={setStart}
            onChangeDest={setDest}
            onPressFind={() => {}}
            onOpenCategoriesStart={() => {
              setCategoryField("start");
              setMode("categories");
            }}
            onLocateStart={() => {
              setStart("Current location");
            }}
            onOpenCategoriesDest={() => {
              setCategoryField("dest");
              setMode("categories");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  mapArea: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  bottomPanel: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: colors.primary[800],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
});
