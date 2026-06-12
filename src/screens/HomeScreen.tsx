import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface QuickAction {
  icon: string;
  label: string;
  color: string;
}

const HomeScreen: React.FC = () => {
  const features: Feature[] = [
    {
      icon: '✏️',
      title: 'Advanced Design',
      description: 'Multiple tools, pens, and pencils for precise fabric design',
    },
    {
      icon: '📊',
      title: 'Graph Paper',
      description: '50x100 dot grid for detailed pattern creation',
    },
    {
      icon: '📄',
      title: 'Theory Paper',
      description: 'A4 paper for annotations and documentation',
    },
    {
      icon: '🖼️',
      title: 'Image Support',
      description: 'Import and place images from gallery',
    },
    {
      icon: '📌',
      title: 'Peg Plan Analysis',
      description: 'Automatic weaving loom configuration',
    },
    {
      icon: '🎲',
      title: '3D Visualization',
      description: 'Interactive 3D thread visualization',
    },
  ];

  const quickActions: QuickAction[] = [
    { icon: '✏️', label: 'New Design', color: '#4f8ef7' },
    { icon: '📊', label: 'Graph Paper', color: '#a78bfa' },
    { icon: '🖼️', label: 'Gallery', color: '#34d399' },
  ];

  const stats = [
    { label: 'Total Designs', value: '24' },
    { label: 'Storage Used', value: '2.4 GB' },
    { label: 'Hours Worked', value: '142.5' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>⬡ Genius Sanjeev</Text>
          <Text style={styles.welcomeSubtitle}>
            Advanced Fabric Design Studio
          </Text>
          <Text style={styles.welcomeDesc}>
            Professional textile design tools for creative minds
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Quick Start</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.quickActionBtn,
                  { backgroundColor: action.color + '20' },
                  { borderColor: action.color },
                ]}
              >
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <View key={idx} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Key Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <View key={idx} style={styles.featureCard}>
                <View style={styles.featureHeader}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                </View>
                <Text style={styles.featureDesc}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Recent Activity</Text>
          <View style={styles.activityList}>
            {[
              { icon: '✏️', text: 'Created new design "Damask v2"', time: '2h ago' },
              { icon: '📤', text: 'Exported design to PNG', time: '5h ago' },
              { icon: '🔄', text: 'Synced with cloud', time: '1d ago' },
              { icon: '📊', text: 'Generated 3D visualization', time: '2d ago' },
            ].map((item, idx) => (
              <View key={idx} style={styles.activityItem}>
                <Text style={styles.activityIcon}>{item.icon}</Text>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{item.text}</Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Quick Tips</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>
                🎨 Use Independent Pencil for Notes
              </Text>
              <Text style={styles.tipText}>
                Switch to "Free Pencil" mode to add notes without grid snapping
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>
                📐 Customize Grid Size
              </Text>
              <Text style={styles.tipText}>
                Adjust warp and weft values for different pattern sizes (up to 50x100)
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>
                🖼️ Drag Images Around
              </Text>
              <Text style={styles.tipText}>
                Import images and place them anywhere for damask/brocade designs
              </Text>
            </View>
          </View>
        </View>

        {/* Version Info */}
        <View style={styles.footerSection}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.creditsText}>Made with ❤️ for textile designers</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeSection: {
    paddingVertical: 24,
    paddingTop: 12,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#4f8ef7',
    marginBottom: 4,
    letterSpacing: 1,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#a78bfa',
    marginBottom: 8,
  },
  welcomeDesc: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#60a5fa',
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  quickActionBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#f1f5f9',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a2235',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4f8ef7',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
    textAlign: 'center',
  },
  featuresGrid: {
    gap: 10,
  },
  featureCard: {
    backgroundColor: '#1a2235',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  featureDesc: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 16,
  },
  activityList: {
    gap: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#1a2235',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  activityIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 12,
    color: '#f1f5f9',
    fontWeight: '600',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 10,
    color: '#64748b',
  },
  tipsContainer: {
    gap: 10,
  },
  tipCard: {
    backgroundColor: 'rgba(79,142,247,0.1)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#4f8ef7',
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#60a5fa',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 16,
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 10,
  },
  versionText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  creditsText: {
    fontSize: 10,
    color: '#475569',
    marginTop: 4,
  },
});

export default HomeScreen;
