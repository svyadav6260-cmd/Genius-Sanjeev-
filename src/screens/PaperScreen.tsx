import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const PAPER_WIDTH = 210; // A4 width in mm
const PAPER_HEIGHT = 297; // A4 height in mm
const SCALE = 0.5; // pixels per mm

interface TextNote {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
}

interface PatternSize {
  id: string;
  size: number;
  label: string;
  x: number;
  y: number;
}

interface PaperState {
  title: string;
  notes: TextNote[];
  patternSizes: PatternSize[];
  selectedColor: string;
}

const PaperScreen: React.FC = () => {
  const [state, setState] = useState<PaperState>({
    title: 'Fabric Design Notes - A4 Paper',
    notes: [],
    patternSizes: [],
    selectedColor: '#4f8ef7',
  });

  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);

  const paperWidth = PAPER_WIDTH * SCALE;
  const paperHeight = PAPER_HEIGHT * SCALE;

  const handleAddPatternSize = (size: number) => {
    const newSize: PatternSize = {
      id: `size_${Date.now()}`,
      size,
      label: size.toString(),
      x: Math.random() * (paperWidth - 40),
      y: Math.random() * (paperHeight - 40),
    };
    setState((prev) => ({
      ...prev,
      patternSizes: [...prev.patternSizes, newSize],
    }));
    Alert.alert('Added', `Pattern size ${size} added!`);
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) {
      Alert.alert('Empty', 'Please enter some text');
      return;
    }

    const newNote: TextNote = {
      id: `note_${Date.now()}`,
      text: newNoteText,
      x: 50,
      y: 50,
      fontSize: 12,
    };
    setState((prev) => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }));
    setNewNoteText('');
    setShowTextInput(false);
    Alert.alert('Added', 'Note added to paper!');
  };

  const handleDeleteNote = (id: string) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id),
    }));
  };

  const handleDeleteSize = (id: string) => {
    setState((prev) => ({
      ...prev,
      patternSizes: prev.patternSizes.filter((s) => s.id !== id),
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📄 Theory Paper (A4)</Text>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>💾 Save</Text>
        </TouchableOpacity>
      </View>

      {/* Controls */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.controlsBar}
      >
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setShowTextInput(true)}
        >
          <Text style={styles.controlIcon}>📝</Text>
          <Text style={styles.controlLabel}>Add Note</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => handleAddPatternSize(1)}
        >
          <Text style={styles.controlIcon}>1️⃣</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => handleAddPatternSize(2)}
        >
          <Text style={styles.controlIcon}>2️⃣</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => handleAddPatternSize(3)}
        >
          <Text style={styles.controlIcon}>3️⃣</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => handleAddPatternSize(4)}
        >
          <Text style={styles.controlIcon}>4️⃣</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlBtn, { backgroundColor: '#1e3a5f' }]}
          onPress={() => setState((prev) => ({ ...prev, notes: [], patternSizes: [] }))}
        >
          <Text style={styles.controlIcon}>🗑</Text>
          <Text style={styles.controlLabel}>Clear</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* A4 Paper Canvas */}
      <ScrollView
        style={styles.paperContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.paperWrapper}>
          <View
            style={[
              styles.paper,
              { width: paperWidth, height: paperHeight },
            ]}
          >
            {/* Paper Header */}
            <View style={styles.paperHeader}>
              <Text style={styles.paperTitle}>Fabric Design Notes</Text>
              <Text style={styles.paperSubtitle}>A4 Theory Sheet</Text>
            </View>

            {/* Divider */}
            <View style={styles.paperDivider} />

            {/* Content Area */}
            <View style={styles.paperContent}>
              {/* Pattern Size Labels (Bottom) */}
              {state.patternSizes.length > 0 && (
                <View style={styles.sizesSection}>
                  <Text style={styles.sizesSectionTitle}>Pattern Sizes:</Text>
                  <View style={styles.sizesList}>
                    {state.patternSizes.map((size) => (
                      <View key={size.id} style={styles.sizeItem}>
                        <Text style={styles.sizeLabel}>Size {size.label}</Text>
                        <TouchableOpacity
                          onPress={() => handleDeleteSize(size.id)}
                        >
                          <Text style={styles.removeBtn}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Notes */}
              {state.notes.length > 0 && (
                <View style={styles.notesSection}>
                  <Text style={styles.notesSectionTitle}>Notes:</Text>
                  {state.notes.map((note) => (
                    <View key={note.id} style={styles.noteItem}>
                      <Text
                        style={[
                          styles.noteText,
                          { fontSize: note.fontSize },
                        ]}
                      >
                        {note.text}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleDeleteNote(note.id)}
                      >
                        <Text style={styles.removeBtn}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {/* Empty State */}
              {state.notes.length === 0 && state.patternSizes.length === 0 && (
                <View style={styles.emptyArea}>
                  <Text style={styles.emptyText}>📋 Add notes and pattern sizes</Text>
                  <Text style={styles.emptySubtext}>
                    Use controls above to add content
                  </Text>
                </View>
              )}
            </View>

            {/* Footer */}
            <View style={styles.paperFooter}>
              <Text style={styles.footerText}>
                Date: ________________
              </Text>
              <Text style={styles.footerText}>
                Designer: ________________
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Text Input Modal */}
      {showTextInput && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Note</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your note here..."
              placeholderTextColor="#64748b"
              value={newNoteText}
              onChangeText={setNewNoteText}
              multiline
              maxLength={200}
            />
            <Text style={styles.charCount}>
              {newNoteText.length}/200
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#ef4444' }]}
                onPress={() => {
                  setShowTextInput(false);
                  setNewNoteText('');
                }}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#34d399' }]}
                onPress={handleAddNote}
              >
                <Text style={styles.modalBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.infoText}>
          Notes: {state.notes.length} • Sizes: {state.patternSizes.length}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  saveBtn: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4f8ef7',
  },
  saveBtnText: {
    color: '#93c5fd',
    fontWeight: 'bold',
    fontSize: 12,
  },
  controlsBar: {
    maxHeight: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#0d1220',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  controlBtn: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 6,
    backgroundColor: '#1a2235',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  controlIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  controlLabel: {
    fontSize: 9,
    color: '#94a3b8',
    fontWeight: '600',
  },
  paperContainer: {
    flex: 1,
    backgroundColor: '#0d1220',
  },
  paperWrapper: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  paper: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    padding: 16,
  },
  paperHeader: {
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#4f8ef7',
    paddingBottom: 8,
  },
  paperTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a0e1a',
    marginBottom: 2,
  },
  paperSubtitle: {
    fontSize: 10,
    color: '#64748b',
  },
  paperDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  paperContent: {
    flex: 1,
    marginBottom: 8,
  },
  sizesSection: {
    marginBottom: 12,
  },
  sizesSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0a0e1a',
    marginBottom: 4,
  },
  sizesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  sizeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  sizeLabel: {
    fontSize: 9,
    color: '#0a0e1a',
    fontWeight: '600',
    marginRight: 4,
  },
  notesSection: {
    marginBottom: 8,
  },
  notesSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0a0e1a',
    marginBottom: 4,
  },
  noteItem: {
    backgroundColor: '#f9fafb',
    padding: 6,
    borderRadius: 4,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteText: {
    color: '#1f2937',
    flex: 1,
    lineHeight: 16,
  },
  removeBtn: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  emptyArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 10,
    color: '#d1d5db',
  },
  paperFooter: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
    marginTop: 8,
  },
  footerText: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 3,
  },
  modalOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#1a2235',
    borderRadius: 12,
    padding: 16,
    width: '85%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  modalInput: {
    backgroundColor: '#0d1220',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: 10,
    color: '#f1f5f9',
    fontSize: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 6,
  },
  charCount: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
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

export default PaperScreen;
