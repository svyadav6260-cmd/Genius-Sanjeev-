import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingItem {
  category: string;
  settings: Array<{
    id: string;
    label: string;
    type: 'toggle' | 'action' | 'info';
    value?: boolean;
  }>;
}

const SettingsScreen: React.FC = () => {
  const [autoSave, setAutoSave] = React.useState(true);
  const [cloudSync, setCloudSync] = React.useState(true);
  const [highQuality, setHighQuality] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true);

  const settingItems: SettingItem[] = [
    {
      category: '💾 Storage',
      settings: [
        { id: 'auto-save', label: 'Auto Save', type: 'toggle', value: autoSave },
        { id: 'cloud-sync', label: 'Cloud Sync', type: 'toggle', value: cloudSync },
        { id: 'high-quality', label: 'Export High Quality', type: 'toggle', value: highQuality },
        { id: 'clear-cache', label: 'Clear Cache', type: 'action' },
      ],
    },
    {
      category: '🎨 Appearance',
      settings: [
        { id: 'dark-mode', label: 'Dark Mode', type: 'toggle', value: darkMode },
      ],
    },
    {
      category: '⚙️ About',
      settings: [
        { id: 'version', label: 'App Version: 1.0.0', type: 'info' },
        { id: 'feedback', label: 'Send Feedback', type: 'action' },
        { id: 'rate', label: 'Rate App', type: 'action' },
        { id: 'privacy', label: 'Privacy Policy', type: 'action' },
        { id: 'terms', label: 'Terms of Service', type: 'action' },
      ],
    },
  ];

  const handleToggle = (id: string, value: boolean) => {
    switch (id) {
      case 'auto-save':
        setAutoSave(value);
        break;
      case 'cloud-sync':
        setCloudSync(value);
        break;
      case 'high-quality':
        setHighQuality(value);
        break;
      case 'dark-mode':
        setDarkMode(value);
        break;
    }
  };

  const handleAction = (id: string) => {
    switch (id) {
      case 'clear-cache':
        Alert.alert('Clear Cache', 'This will free up storage', [
          { text: 'Cancel' },
          {
            text: 'Clear',
            onPress: () => Alert.alert('Success', 'Cache cleared!'),
          },
        ]);
        break;
      case 'feedback':
        Alert.alert('Send Feedback', 'Open email client?', [
          { text: 'Cancel' },
          { text: 'Send', onPress: () => {} },
        ]);
        break;
      case 'rate':
        Alert.alert('Rate App', 'Open App Store?', [
          { text: 'Cancel' },
          { text: 'Rate', onPress: () => {} },
        ]);
        break;
      case 'privacy':
        Linking.openURL('https://github.com/svyadav6260-cmd/Genius-Sanjeev-');
        break;
      case 'terms':
        Linking.openURL('https://github.com/svyadav6260-cmd/Genius-Sanjeev-');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Settings</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingItems.map((item, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            <View style={styles.settingsList}>
              {item.settings.map((setting, sidx) => (
                <View
                  key={setting.id}
                  style={[
                    styles.settingItem,
                    sidx === item.settings.length - 1 && styles.lastItem,
                  ]}
                >
                  {setting.type === 'toggle' && (
                    <>
                      <Text style={styles.settingLabel}>{setting.label}</Text>
                      <Switch
                        value={setting.value || false}
                        onValueChange={(value) =>
                          handleToggle(setting.id, value)
                        }
                        trackColor={{ false: '#1a2235', true: '#4f8ef7' }}
                        thumbColor={
                          setting.value ? '#60a5fa' : '#64748b'
                        }
                      />
                    </>
                  )}
                  {setting.type === 'action' && (
                    <>
                      <Text style={styles.settingLabel}>{setting.label}</Text>
                      <TouchableOpacity
                        onPress={() => handleAction(setting.id)}
                      >
                        <Text style={styles.actionArrow}>›</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {setting.type === 'info' && (
                    <>
                      <Text style={styles.settingLabel}>{setting.label}</Text>
                      <Text style={styles.infoValue} />
                    </>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Storage Info */}
        <View style={styles.section}>
          <Text style={styles.categoryTitle}>💾 Storage Info</Text>
          <View style={styles.storageCard}>
            <View style={styles.storageRow}>
              <Text style={styles.storageLabel}>Used</Text>
              <Text style={styles.storageValue}>2.4 GB</Text>
            </View>
            <View style={styles.storageRow}>
              <Text style={styles.storageLabel}>Available</Text>
              <Text style={styles.storageValue}>5.6 GB</Text>
            </View>
            <View style={styles.storageBar}>
              <View style={styles.storageUsed} />
            </View>
          </View>
        </View>

        {/* Developer Info */}
        <View style={styles.section}>
          <Text style={styles.categoryTitle}>👨‍💻 Developer</Text>
          <View style={styles.devCard}>
            <Text style={styles.devName}>Sy Yadav</Text>
            <Text style={styles.devRole}>Creative Developer</Text>
            <Text style={styles.devEmail}>svyadav6260@gmail.com</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() =>
                  Linking.openURL('https://github.com/svyadav6260-cmd')
                }
              >
                <Text style={styles.socialIcon}>🐙</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialIcon}>🔗</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ for textile designers</Text>
          <Text style={styles.footerVersion}>Version 1.0.0 • Build 1</Text>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#60a5fa',
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  settingsList: {
    backgroundColor: '#1a2235',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLabel: {
    fontSize: 13,
    color: '#f1f5f9',
    fontWeight: '600',
    flex: 1,
  },
  actionArrow: {
    fontSize: 24,
    color: '#64748b',
  },
  infoValue: {
    flex: 1,
  },
  storageCard: {
    backgroundColor: '#1a2235',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  storageLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  storageValue: {
    fontSize: 12,
    color: '#4f8ef7',
    fontWeight: 'bold',
  },
  storageBar: {
    height: 8,
    backgroundColor: '#222d42',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
  },
  storageUsed: {
    width: '30%',
    height: '100%',
    backgroundColor: '#4f8ef7',
  },
  devCard: {
    backgroundColor: '#1a2235',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  devName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 2,
  },
  devRole: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 2,
  },
  devEmail: {
    fontSize: 11,
    color: '#4f8ef7',
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  socialBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222d42',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 18,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 11,
    color: '#64748b',
  },
});

export default SettingsScreen;
