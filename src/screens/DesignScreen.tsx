import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  PanResponder,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface Tool {
  id: string;
  name: string;
  icon: string;
  type: 'pen' | 'pencil' | 'tool';
}

interface PenType {
  id: string;
  name: string;
  width: number;
  icon: string;
}

interface DrawingState {
  paths: any[];
  currentPath: string;
  selectedTool: string;
  selectedPen: string;
  selectedColor: string;
  images: Array<{ uri: string; x: number; y: number }>;
  texts: Array<{ text: string; x: number; y: number }>;
}

const PENS: PenType[] = [
  { id: 'fine', name: 'Fine (0.5mm)', width: 0.5, icon: '─' },
  { id: 'medium', name: 'Medium (1mm)', width: 1, icon: '═' },
  { id: 'thick', name: 'Thick (2mm)', width: 2, icon: '█' },
  { id: 'brush', name: 'Brush', width: 3, icon: '🖌' },
  { id: 'highlight', name: 'Highlighter', width: 4, icon: '🔆' },
];

const PENCILS: PenType[] = [
  { id: 'hb', name: 'HB Pencil', width: 1, icon: '✏️' },
  { id: '2b', name: '2B Pencil', width: 1.2, icon: '✏️' },
  { id: '4b', name: '4B Pencil', width: 1.5, icon: '✏️' },
  { id: 'mechanical', name: 'Mechanical', width: 0.7, icon: '🖊' },
  { id: 'free', name: 'Free Pencil', width: 1, icon: '✒️' },
];

const TOOLS: Tool[] = [
  { id: 'draw', name: 'Draw', icon: '✏️', type: 'pen' },
  { id: 'erase', name: 'Erase', icon: '🧹', type: 'tool' },
  { id: 'fill', name: 'Fill', icon: '🪣', type: 'tool' },
  { id: 'rect', name: 'Rectangle', icon: '⬜', type: 'tool' },
  { id: 'text', name: 'Text', icon: '📝', type: 'tool' },
  { id: 'image', name: 'Image', icon: '🖼️', type: 'tool' },
];

const COLORS = [
  '#4f8ef7', '#a78bfa', '#34d399', '#f59e0b', '#ef4444', '#ec4899',
  '#06b6d4', '#f97316', '#000000', '#1e293b', '#64748b', '#10b981',
  '#fbbf24', '#f472b6', '#38bdf8', '#7c3aed', '#dc2626', '#15803d',
];

const DesignScreen: React.FC = () => {
  const canvasRef = useRef(null);
  const [state, setState] = useState<DrawingState>({
    paths: [],
    currentPath: '',
    selectedTool: 'draw',
    selectedPen: 'medium',
    selectedColor: '#4f8ef7',
    images: [],
    texts: [],
  });

  const [gridSize, setGridSize] = useState({ cols: 8, rows: 8 });
  const [zoom, setZoom] = useState(1);

  const handleToolChange = (toolId: string) => {
    setState((prev) => ({ ...prev, selectedTool: toolId }));
  };

  const handlePenChange = (penId: string) => {
    setState((prev) => ({ ...prev, selectedPen: penId }));
  };

  const handleColorChange = (color: string) => {
    setState((prev) => ({ ...prev, selectedColor: color }));
  };

  const handleClearAll = () => {
    Alert.alert('Clear All', 'Are you sure you want to clear everything?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Clear',
        onPress: () => {
          setState((prev) => ({
            ...prev,
            paths: [],
            currentPath: '',
            images: [],
            texts: [],
          }));
        },
      },
    ]);
  };

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setState((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          { uri: result.assets[0].uri, x: 100, y: 100 },
        ],
      }));
    }
  };

  const handleSave = () => {
    Alert.alert('Design Saved', 'Your design has been saved to gallery!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Toolbar */}
      <View style={styles.topToolbar}>
        <Text style={styles.appTitle}>⬡ Genius Sanjeev</Text>
        <TouchableOpacity
          style={styles.topBtn}
          onPress={handleSave}
        >
          <Text style={styles.btnText}>💾 Save</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tools Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔧 Tools</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.toolScroll}
          >
            {TOOLS.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={[
                  styles.toolBtn,
                  state.selectedTool === tool.id && styles.toolBtnActive,
                ]}
                onPress={() => handleToolChange(tool.id)}
              >
                <Text style={styles.toolIcon}>{tool.icon}</Text>
                <Text style={styles.toolLabel}>{tool.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Pens Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🖊️ Pens</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.toolScroll}
          >
            {PENS.map((pen) => (
              <TouchableOpacity
                key={pen.id}
                style={[
                  styles.penBtn,
                  state.selectedPen === pen.id && styles.penBtnActive,
                ]}
                onPress={() => handlePenChange(pen.id)}
              >
                <Text style={styles.penIcon}>{pen.icon}</Text>
                <Text style={styles.penLabel}>{pen.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Pencils Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✏️ Pencils</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.toolScroll}
          >
            {PENCILS.map((pencil) => (
              <TouchableOpacity
                key={pencil.id}
                style={[
                  styles.penBtn,
                  state.selectedPen === pencil.id && styles.penBtnActive,
                ]}
                onPress={() => handlePenChange(pencil.id)}
              >
                <Text style={styles.penIcon}>{pencil.icon}</Text>
                <Text style={styles.penLabel}>{pencil.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Colors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Colors</Text>
          <View style={styles.colorGrid}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorBox,
                  { backgroundColor: color },
                  state.selectedColor === color && styles.colorBoxActive,
                ]}
                onPress={() => handleColorChange(color)}
              />
            ))}
          </View>
        </View>

        {/* Grid Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📏 Grid Settings</Text>
          <View style={styles.gridControls}>
            <View style={styles.gridControl}>
              <Text style={styles.gridLabel}>Warp (Cols)</Text>
              <TouchableOpacity
                style={styles.gridBtn}
                onPress={() =>
                  setGridSize((prev) => ({
                    ...prev,
                    cols: Math.max(2, prev.cols - 1),
                  }))
                }
              >
                <Text style={styles.gridBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.gridValue}>{gridSize.cols}</Text>
              <TouchableOpacity
                style={styles.gridBtn}
                onPress={() =>
                  setGridSize((prev) => ({
                    ...prev,
                    cols: Math.min(50, prev.cols + 1),
                  }))
                }
              >
                <Text style={styles.gridBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gridControl}>
              <Text style={styles.gridLabel}>Weft (Rows)</Text>
              <TouchableOpacity
                style={styles.gridBtn}
                onPress={() =>
                  setGridSize((prev) => ({
                    ...prev,
                    rows: Math.max(2, prev.rows - 1),
                  }))
                }
              >
                <Text style={styles.gridBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.gridValue}>{gridSize.rows}</Text>
              <TouchableOpacity
                style={styles.gridBtn}
                onPress={() =>
                  setGridSize((prev) => ({
                    ...prev,
                    rows: Math.min(100, prev.rows + 1),
                  }))
                }
              >
                <Text style={styles.gridBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Zoom Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔍 Zoom</Text>
          <View style={styles.zoomControls}>
            <TouchableOpacity
              style={styles.zoomBtn}
              onPress={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
            >
              <Text style={styles.zoomBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.zoomValue}>{Math.round(zoom * 100)}%</Text>
            <TouchableOpacity
              style={styles.zoomBtn}
              onPress={() => setZoom((prev) => Math.min(3, prev + 0.1))}
            >
              <Text style={styles.zoomBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#ef4444' }]}
              onPress={handleClearAll}
            >
              <Text style={styles.actionBtnText}>🗑 Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#34d399' }]}
              onPress={handleAddImage}
            >
              <Text style={styles.actionBtnText}>🖼️ Add Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Canvas Preview */}
        <View style={styles.canvasPreview}>
          <View
            style={[
              styles.previewArea,
              {
                width: gridSize.cols * 30 * zoom,
                height: gridSize.rows * 30 * zoom,
              },
            ]}
            ref={canvasRef}
          >
            <View style={styles.previewGrid}>
              {Array.from({ length: gridSize.rows }).map((_, r) =>
                Array.from({ length: gridSize.cols }).map((_, c) => (
                  <View
                    key={`${r}-${c}`}
                    style={[
                      styles.gridCell,
                      {
                        width: 30 * zoom,
                        height: 30 * zoom,
                        borderColor: state.selectedColor,
                      },
                    ]}
                  />
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e1a',
  },
  topToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  appTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4f8ef7',
  },
  topBtn: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4f8ef7',
  },
  btnText: {
    color: '#93c5fd',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#4f8ef7',
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  toolScroll: {
    flexDirection: 'row',
  },
  toolBtn: {
    alignItems: 'center',
    padding: 8,
    marginRight: 8,
    backgroundColor: '#1a2235',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    minWidth: 70,
  },
  toolBtnActive: {
    backgroundColor: 'rgba(79,142,247,0.2)',
    borderColor: '#4f8ef7',
  },
  toolIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  toolLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '600',
  },
  penBtn: {
    alignItems: 'center',
    padding: 10,
    marginRight: 8,
    backgroundColor: '#1a2235',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    minWidth: 75,
  },
  penBtnActive: {
    backgroundColor: 'rgba(167,139,250,0.2)',
    borderColor: '#a78bfa',
  },
  penIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  penLabel: {
    fontSize: 9,
    color: '#94a3b8',
    fontWeight: '600',
    textAlign: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorBoxActive: {
    borderColor: '#ffffff',
  },
  gridControls: {
    flexDirection: 'row',
    gap: 12,
  },
  gridControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2235',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  gridLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
    marginRight: 6,
    flex: 1,
  },
  gridBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#222d42',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  gridBtnText: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridValue: {
    color: '#4f8ef7',
    fontSize: 13,
    fontWeight: 'bold',
    width: 30,
    textAlign: 'center',
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2235',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  zoomBtn: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#222d42',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomBtnText: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  zoomValue: {
    flex: 1,
    textAlign: 'center',
    color: '#4f8ef7',
    fontWeight: 'bold',
    fontSize: 13,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  canvasPreview: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  previewArea: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4f8ef7',
  },
  previewGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    borderWidth: 1,
    borderColor: 'rgba(79,142,247,0.2)',
  },
});

export default DesignScreen;
