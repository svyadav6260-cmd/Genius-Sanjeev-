import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface GraphPoint {
  x: number;
  y: number;
}

interface GraphState {
  gridWidth: number;
  gridHeight: number;
  dotSize: number;
  dotSpacing: number;
  selectedColor: string;
  paths: Array<{ points: GraphPoint[]; color: string; width: number }>;
  selectedTool: 'draw' | 'erase' | 'pencil';
  penWidth: number;
}

const COLORS = [
  '#4f8ef7', '#a78bfa', '#34d399', '#f59e0b', '#ef4444', '#ec4899',
  '#06b6d4', '#f97316', '#000000', '#1e293b', '#ffffff',
];

const GraphScreen: React.FC = () => {
  const [state, setState] = useState<GraphState>({
    gridWidth: 50,
    gridHeight: 100,
    dotSize: 1.5,
    dotSpacing: 12,
    selectedColor: '#4f8ef7',
    paths: [],
    selectedTool: 'pencil',
    penWidth: 1,
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const currentPathRef = useRef<GraphPoint[]>([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        setIsDrawing(true);
        const { locationX, locationY } = evt.nativeEvent;
        currentPathRef.current = [{ x: locationX, y: locationY }];
      },
      onPanResponderMove: (evt) => {
        if (!isDrawing) return;
        const { locationX, locationY } = evt.nativeEvent;
        currentPathRef.current.push({ x: locationX, y: locationY });
      },
      onPanResponderRelease: () => {
        if (currentPathRef.current.length > 0) {
          setState((prev) => ({
            ...prev,
            paths: [
              ...prev.paths,
              {
                points: currentPathRef.current,
                color: state.selectedColor,
                width: state.penWidth,
              },
            ],
          }));
        }
        currentPathRef.current = [];
        setIsDrawing(false);
      },
    })
  ).current;

  const handleClear = () => {
    Alert.alert('Clear Graph', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Clear',
        onPress: () => setState((prev) => ({ ...prev, paths: [] })),
      },
    ]);
  };

  const handleGridSizeChange = (width: number, height: number) => {
    setState((prev) => ({
      ...prev,
      gridWidth: Math.max(10, Math.min(100, width)),
      gridHeight: Math.max(10, Math.min(150, height)),
    }));
  };

  const handleDotSpacingChange = (spacing: number) => {
    setState((prev) => ({
      ...prev,
      dotSpacing: Math.max(6, Math.min(20, spacing)),
    }));
  };

  const canvasWidth = state.gridWidth * state.dotSpacing;
  const canvasHeight = state.gridHeight * state.dotSpacing;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📊 Graph Paper (Dots Only)</Text>
      </View>

      {/* Controls */}
      <ScrollView style={styles.controls} showsVerticalScrollIndicator={false}>
        {/* Tool Selection */}
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>🎯 Tool</Text>
          <View style={styles.toolGroup}>
            {[
              { id: 'draw', icon: '✏️', label: 'Draw' },
              { id: 'pencil', icon: '✒️', label: 'Free Pencil' },
              { id: 'erase', icon: '🧹', label: 'Erase' },
            ].map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={[
                  styles.toolOption,
                  state.selectedTool === tool.id && styles.toolOptionActive,
                ]}
                onPress={() =>
                  setState((prev) => ({
                    ...prev,
                    selectedTool: tool.id as any,
                  }))
                }
              >
                <Text style={styles.toolIcon}>{tool.icon}</Text>
                <Text style={styles.toolLabel}>{tool.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pen Width */}
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>🖊️ Pen Width</Text>
          <View style={styles.sliderGroup}>
            {[0.5, 1, 1.5, 2].map((width) => (
              <TouchableOpacity
                key={width}
                style={[
                  styles.sliderOption,
                  state.penWidth === width && styles.sliderOptionActive,
                ]}
                onPress={() =>
                  setState((prev) => ({ ...prev, penWidth: width }))
                }
              >
                <Text style={styles.sliderLabel}>{width}mm</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Color Picker */}
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>🎨 Color</Text>
          <View style={styles.colorGrid}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorDot,
                  { backgroundColor: color },
                  state.selectedColor === color && styles.colorDotActive,
                ]}
                onPress={() =>
                  setState((prev) => ({ ...prev, selectedColor: color }))
                }
              />
            ))}
          </View>
        </View>

        {/* Grid Settings */}
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>📐 Grid Settings</Text>
          <View style={styles.gridSettings}>
            <View style={styles.gridSetting}>
              <Text style={styles.gridLabel}>Width: {state.gridWidth}</Text>
              <View style={styles.gridControls}>
                <TouchableOpacity
                  style={styles.gridBtn}
                  onPress={() =>
                    handleGridSizeChange(state.gridWidth - 5, state.gridHeight)
                  }
                >
                  <Text style={styles.gridBtnText}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.gridBtn}
                  onPress={() =>
                    handleGridSizeChange(state.gridWidth + 5, state.gridHeight)
                  }
                >
                  <Text style={styles.gridBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.gridSetting}>
              <Text style={styles.gridLabel}>Height: {state.gridHeight}</Text>
              <View style={styles.gridControls}>
                <TouchableOpacity
                  style={styles.gridBtn}
                  onPress={() =>
                    handleGridSizeChange(state.gridWidth, state.gridHeight - 5)
                  }
                >
                  <Text style={styles.gridBtnText}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.gridBtn}
                  onPress={() =>
                    handleGridSizeChange(state.gridWidth, state.gridHeight + 5)
                  }
                >
                  <Text style={styles.gridBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.gridSetting}>
              <Text style={styles.gridLabel}>
                Spacing: {state.dotSpacing}
              </Text>
              <View style={styles.gridControls}>
                <TouchableOpacity
                  style={styles.gridBtn}
                  onPress={() =>
                    handleDotSpacingChange(state.dotSpacing - 1)
                  }
                >
                  <Text style={styles.gridBtnText}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.gridBtn}
                  onPress={() =>
                    handleDotSpacingChange(state.dotSpacing + 1)
                  }
                >
                  <Text style={styles.gridBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.controlSection}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#34d399' }]}
            onPress={() => Alert.alert('Saved', 'Graph saved to gallery!')}
          >
            <Text style={styles.actionBtnText}>💾 Save Graph</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#ef4444' }]}
            onPress={handleClear}
          >
            <Text style={styles.actionBtnText}>🗑 Clear All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Canvas Area */}
      <View style={styles.canvasContainer}>
        <ScrollView
          horizontal
          scrollEnabled={canvasWidth > width - 40}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={[
              styles.canvas,
              { width: canvasWidth + 40, height: canvasHeight + 40 },
            ]}
            {...panResponder.panHandlers}
          >
            {/* Grid Dots */}
            {Array.from({ length: state.gridHeight }).map((_, row) =>
              Array.from({ length: state.gridWidth }).map((_, col) => (
                <View
                  key={`${row}-${col}`}
                  style={[
                    styles.gridDot,
                    {
                      left: 20 + col * state.dotSpacing,
                      top: 20 + row * state.dotSpacing,
                      width: state.dotSize,
                      height: state.dotSize,
                      borderRadius: state.dotSize / 2,
                    },
                  ]}
                />
              ))
            )}

            {/* Drawn Paths (Simple rendering) */}
            {state.paths.map((path, idx) => (
              <View key={idx} style={{ position: 'absolute' }}>
                {path.points.map((point, pidx) => (
                  <View
                    key={pidx}
                    style={{
                      position: 'absolute',
                      left: point.x,
                      top: point.y,
                      width: path.width * 2,
                      height: path.width * 2,
                      borderRadius: path.width,
                      backgroundColor: path.color,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.infoText}>
          Grid: {state.gridWidth}×{state.gridHeight} • Spacing: {state.dotSpacing}px • Tool: {state.selectedTool}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e1a',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a78bfa',
  },
  controls: {
    maxHeight: 200,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#0d1220',
  },
  controlSection: {
    marginBottom: 12,
  },
  controlTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#60a5fa',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  toolGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  toolOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#1a2235',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  toolOptionActive: {
    backgroundColor: 'rgba(79,142,247,0.2)',
    borderColor: '#4f8ef7',
  },
  toolIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  toolLabel: {
    fontSize: 9,
    color: '#94a3b8',
    fontWeight: '600',
  },
  sliderGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  sliderOption: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#1a2235',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  sliderOptionActive: {
    backgroundColor: 'rgba(167,139,250,0.2)',
    borderColor: '#a78bfa',
  },
  sliderLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  colorDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorDotActive: {
    borderColor: '#ffffff',
  },
  gridSettings: {
    gap: 8,
  },
  gridSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a2235',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  gridLabel: {
    flex: 1,
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  gridControls: {
    flexDirection: 'row',
    gap: 4,
  },
  gridBtn: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#222d42',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridBtnText: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionBtn: {
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 6,
  },
  actionBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: '#0d1220',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  canvas: {
    backgroundColor: '#ffffff',
    position: 'relative',
    margin: 20,
    borderRadius: 8,
  },
  gridDot: {
    position: 'absolute',
    backgroundColor: 'rgba(79,142,247,0.3)',
  },
  info: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  infoText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
});

export default GraphScreen;
