import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const { width } = Dimensions.get('window');

interface Design {
  id: string;
  name: string;
  thumbnail: string;
  date: string;
  size: string;
}

const GalleryScreen: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([
    {
      id: '1',
      name: 'Damask Pattern v1',
      thumbnail: require('../../assets/placeholder.png'),
      date: 'Jun 10, 2024',
      size: '2.4 MB',
    },
    {
      id: '2',
      name: 'Brocade Design',
      thumbnail: require('../../assets/placeholder.png'),
      date: 'Jun 8, 2024',
      size: '1.8 MB',
    },
  ]);

  const [selectedDesigns, setSelectedDesigns] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');

  const handleImportImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newDesign: Design = {
        id: `design_${Date.now()}`,
        name: `Imported Design ${designs.length + 1}`,
        thumbnail: result.assets[0].uri,
        date: new Date().toLocaleDateString(),
        size: '1.2 MB',
      };
      setDesigns([newDesign, ...designs]);
      Alert.alert('Success', 'Design imported successfully!');
    }
  };

  const handleExport = (id: string) => {
    Alert.alert('Export Options', 'Choose export format', [
      { text: 'PNG', onPress: () => Alert.alert('Exported', 'Saved as PNG') },
      { text: 'PDF', onPress: () => Alert.alert('Exported', 'Saved as PDF') },
      { text: 'SVG', onPress: () => Alert.alert('Exported', 'Saved as SVG') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => {
          setDesigns(designs.filter((d) => d.id !== id));
          setSelectedDesigns(selectedDesigns.filter((s) => s !== id));
        },
      },
    ]);
  };

  const handleSelectDesign = (id: string) => {
    if (selectedDesigns.includes(id)) {
      setSelectedDesigns(selectedDesigns.filter((s) => s !== id));
    } else {
      setSelectedDesigns([...selectedDesigns, id]);
    }
  };

  const filteredDesigns = designs.filter((d) =>
    d.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderDesignCard = ({ item }: { item: Design }) => (
    <TouchableOpacity
      style={[
        styles.designCard,
        selectedDesigns.includes(item.id) && styles.designCardSelected,
      ]}
      onLongPress={() => handleSelectDesign(item.id)}
      onPress={() =>
        !selectedDesigns.length &&
        Alert.alert('Design', item.name, [
          { text: 'Open', onPress: () => {} },
          { text: 'Export', onPress: () => handleExport(item.id) },
          { text: 'Share', onPress: () => {} },
          { text: 'Delete', onPress: () => handleDelete(item.id) },
          { text: 'Cancel', style: 'cancel' },
        ])
      }
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.cardOverlay}>
        <Text style={styles.designName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.designDate}>{item.date}</Text>
        <Text style={styles.designSize}>{item.size}</Text>
      </View>
      {selectedDesigns.includes(item.id) && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🖼️ Design Gallery</Text>
        <TouchableOpacity style={styles.importBtn} onPress={handleImportImage}>
          <Text style={styles.importBtnText}>+ Import</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search designs..."
          placeholderTextColor="#64748b"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Stats */}
      {filteredDesigns.length > 0 && (
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Designs</Text>
            <Text style={styles.statValue}>{designs.length}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Selected</Text>
            <Text style={styles.statValue}>{selectedDesigns.length}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Size</Text>
            <Text style={styles.statValue}>7.2 MB</Text>
          </View>
        </View>
      )}

      {/* Gallery Grid */}
      {filteredDesigns.length > 0 ? (
        <FlatList
          data={filteredDesigns}
          renderItem={renderDesignCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContainer}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🖼️</Text>
          <Text style={styles.emptyText}>No designs found</Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={handleImportImage}
          >
            <Text style={styles.emptyBtnText}>Import First Design</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bulk Actions */}
      {selectedDesigns.length > 0 && (
        <View style={styles.bulkActions}>
          <TouchableOpacity style={styles.bulkBtn}>
            <Text style={styles.bulkBtnText}>📤 Export ({selectedDesigns.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bulkBtn, { backgroundColor: '#ef4444' }]}
            onPress={() => {
              Alert.alert(
                'Delete',
                `Delete ${selectedDesigns.length} design(s)?`,
                [
                  { text: 'Cancel' },
                  {
                    text: 'Delete',
                    onPress: () => {
                      setDesigns(
                        designs.filter((d) => !selectedDesigns.includes(d.id))
                      );
                      setSelectedDesigns([]);
                    },
                  },
                ]
              );
            }}
          >
            <Text style={styles.bulkBtnText}>🗑 Delete</Text>
          </TouchableOpacity>
        </View>
      )}
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
    color: '#34d399',
  },
  importBtn: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4f8ef7',
  },
  importBtnText: {
    color: '#93c5fd',
    fontWeight: 'bold',
    fontSize: 12,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: '#1a2235',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#f1f5f9',
    fontSize: 13,
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#1a2235',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4f8ef7',
    marginTop: 2,
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  designCard: {
    width: (width - 52) / 2,
    backgroundColor: '#1a2235',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  designCardSelected: {
    borderColor: '#4f8ef7',
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    height: 120,
    backgroundColor: '#222d42',
  },
  cardOverlay: {
    padding: 10,
    backgroundColor: 'rgba(10,14,26,0.8)',
  },
  designName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  designDate: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 2,
  },
  designSize: {
    fontSize: 9,
    color: '#475569',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4f8ef7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyBtn: {
    backgroundColor: '#4f8ef7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  bulkActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  bulkBtn: {
    flex: 1,
    backgroundColor: '#4f8ef7',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bulkBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default GalleryScreen;
