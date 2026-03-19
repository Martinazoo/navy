import { useTheme } from "../../constants/ThemeContext";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, Modal, Pressable, Text, View } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";

import CategoriesPanel from "../../components/bottom/CategoriesPanel";
import SchedulePanel from "../../components/bottom/SchedulePanel";
import SearchPanel from "../../components/bottom/SearchPanel";
import TopControls from "../../components/top/TopControls";

import MaterialIcons from "@react-native-vector-icons/material-icons";

import { scheduleDataTable } from "../../constants/scheduleData";
import { createIndexStyles } from "../../constants/styles/indexStyles";
import { getRouteRequest } from "../../services/routeService";
import MapScreen from "../map/MapScreen";
import { set } from "mobx";

const scheduleData = scheduleDataTable;
const BUILDING_OPTIONS = ["Building A", "Building W", "Building M", "Building C"];
const FLOOR_OPTIONS = ["Floor 0", "Floor 1", "Floor 2", "Floor 3"];

type PanelMode = "search" | "categories" | "schedule";
type CategoryField = "start" | "dest" | null;

const MAP_WIDTH = 1684; //1684 //5018
const MAP_HEIGHT = 2384; //2384 //7060
const TILE_X = 318; //314
const TILE_Y = 452; //442
const SCALE_X = MAP_WIDTH / TILE_X;
const SCALE_Y = MAP_HEIGHT / TILE_Y;

export default function Index() {
  const { colors: themeColors, highContrast, fontScale } = useTheme();
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const MIN_PANEL_HEIGHT = 120;
  const MAX_PANEL_HEIGHT = SCREEN_HEIGHT * 0.33;
  

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
  const [routeString, setRouteString] = useState("");

  const panelHeight = useRef(new Animated.Value(MAX_PANEL_HEIGHT)).current;
  const lastOffset = useRef(MAX_PANEL_HEIGHT);

  const styles = useMemo(
    () => createIndexStyles(themeColors, highContrast, fontScale),
    [themeColors, highContrast, fontScale]
  );

  function scalePathString(pathString: string, scaleX: number, scaleY: number): string {
    return pathString
      .split(" ").map(p => {
        const [x, y] = p.split(",").map(Number);
        return `${x * scaleX},${y * scaleY}`;
      }).join(" ");
  }

  const routeTriggerKey = useMemo(() => {
    const normalizedStart = start.trim();
    const normalizedDest = dest.trim();
    if (!normalizedStart || !normalizedDest) {
      return "";
    }

    return `${normalizedStart}::${normalizedDest}`;
  }, [start, dest]);


  useEffect(() => {
    if (!routeTriggerKey) {
      setRouteString("");
      return;
    }

    let isMounted = true;

    const fetchRoute = async () => {
      try {
        const data = await getRouteRequest(start, dest);
        let routeString = scalePathString(data.pathString, SCALE_X, SCALE_Y);
        if (isMounted) {
          setRouteString(routeString);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setRouteString("");
        }
      }
    };
    
    void fetchRoute();

    return () => {
      isMounted = false;
    };
  }, [routeTriggerKey]);

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
      console.log("NFC Tag Detected", tag);
      if (tag) {
        setNfcPopupMessage("Successfully scanned");
        setNfcMessageIcon("check-circle");
        setStart("C5");
        setDest("C6");
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
  
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      let newHeight = lastOffset.current - e.translationY;
      if (newHeight < MIN_PANEL_HEIGHT) newHeight = MIN_PANEL_HEIGHT;
      if (newHeight > MAX_PANEL_HEIGHT) newHeight = MAX_PANEL_HEIGHT;
      panelHeight.setValue(newHeight);
    })
    .onEnd((e) => {
      let newHeight = lastOffset.current - e.translationY;
      if (newHeight < MIN_PANEL_HEIGHT) newHeight = MIN_PANEL_HEIGHT;
      if (newHeight > MAX_PANEL_HEIGHT) newHeight = MAX_PANEL_HEIGHT;
      lastOffset.current = newHeight;
      panelHeight.setValue(newHeight);
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.mapArea}>
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
          <View style={{ position: "absolute"}}>
            <MapScreen routeString={routeString} />
          </View>
        </View>
        <Animated.View
          style={[
            styles.bottomPanel,
            {
              height: panelHeight,
              overflow: "hidden",
            },
          ]}
        >
          <GestureDetector gesture={panGesture}>
            <View
              style={{
                paddingVertical: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: highContrast ? themeColors.primary[950] : themeColors.primary[400],
                  borderRadius: 4,
                }}
              />
            </View>
          </GestureDetector>
          
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
                setStart("UserLoc");
              }}
              onOpenCategoriesDest={() => {
                openCategoryPicker("dest");
              }}
              onExitPress={() => {
                setStart("UserLoc");
                setDest("E2");
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
        </Animated.View>

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
              <MaterialIcons name={nfcMessageIcon as any} size={64} color={themeColors.accent[100]} style={{ alignSelf: "center", marginVertical: 12 }} />
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
    </GestureHandlerRootView>
  );
}
