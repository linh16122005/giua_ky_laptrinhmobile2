import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const stats = [
    { key: 'following', value: '124' },
    { key: 'followers', value: '2.4K' },
    { key: 'myTickets', value: '12' },
    { key: 'myEvents', value: '5' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Text style={styles.headerTitle}>{t('profile.title')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DrawerMenu')}>
            <Text style={{ fontSize: 22 }}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}><Text style={{ fontSize: 48 }}>👤</Text></View>
          <Text style={styles.name}>Ashfak Sayem</Text>
          <Text style={styles.email}>ashfak@eventhub.com</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map(s => (
            <View key={s.key} style={styles.statItem}>
              <Text style={styles.statVal}>{s.value}</Text>
              <Text style={styles.statLabel}>{t(`profile.${s.key}`, s.key)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 16 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#1A1A2E' },
  avatarSection: { alignItems: 'center', paddingVertical: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  email: { fontSize: 13, color: '#999' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#F0F0F0', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', marginHorizontal: 24 },
  statItem: { alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '800', color: '#6C63FF', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#999', textAlign: 'center' },
});
