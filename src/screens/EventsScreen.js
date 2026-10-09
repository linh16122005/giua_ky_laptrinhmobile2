import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { EVENTS } from '../data/mockData';

const EMOJI_MAP = { '1': '🎵', '2': '⚽', '3': '🎨', '4': '💻', '5': '🍜', '6': '✈️' };
const BG_MAP   = { '1': '#FFF0F0', '2': '#F0EFFF', '3': '#FFF8E1', '4': '#E8FFF5', '5': '#FFE8F5', '6': '#E8F4FF' };

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState({ onExplore }) {
  const { t } = useTranslation();
  return (
    <View style={styles.emptyWrap}>
      {/* Illustration */}
      <View style={styles.illustrationCircle}>
        <View style={styles.calendarIcon}>
          {/* Calendar top */}
          <View style={styles.calTop} />
          {/* Calendar body */}
          <View style={styles.calBody}>
            {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
              <View key={i} style={styles.calDot} />
            ))}
          </View>
          {/* Clock overlay */}
          <View style={styles.clockCircle}>
            <View style={styles.clockHand} />
            <View style={styles.clockHandMin} />
          </View>
        </View>
      </View>
      <Text style={styles.emptyTitle}>No Upcoming Event</Text>
      <Text style={styles.emptySubtitle}>Lorem ipsum dolor sit amet,{'\n'}consectetur</Text>
      <TouchableOpacity style={styles.exploreBtn} onPress={onExplore} activeOpacity={0.85}>
        <Text style={styles.exploreBtnText}>EXPLORE EVENTS</Text>
        <View style={styles.exploreBtnArrow}>
          <Text style={{ color: '#6C63FF', fontSize: 18, fontWeight: '700' }}>→</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// ─── Event list item ──────────────────────────────────────────────────────────
function EventRow({ item, onPress }) {
  const d = new Date(item.date);
  const dateStr = d.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
  return (
    <TouchableOpacity style={styles.eventRow} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.rowThumb, { backgroundColor: BG_MAP[item.categoryId] || '#F0EFFF' }]}>
        <Text style={{ fontSize: 26 }}>{EMOJI_MAP[item.categoryId] || '🎪'}</Text>
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.rowDate}>{dateStr} · {item.time}</Text>
        <Text style={styles.rowTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.rowLocRow}>
          <Text style={styles.rowLocIcon}>📍</Text>
          <Text style={styles.rowLoc} numberOfLines={1}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function EventsScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('upcoming'); // upcoming | past

  const events = tab === 'upcoming' ? EVENTS : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}><Text style={{ fontSize: 20 }}>🔍</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Text style={{ fontSize: 20 }}>⋯</Text></TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {[
          { key: 'upcoming', label: 'UPCOMING' },
          { key: 'past',     label: 'PAST EVENTS' },
        ].map(t_ => (
          <TouchableOpacity
            key={t_.key}
            style={[styles.tabBtn, tab === t_.key && styles.tabBtnActive]}
            onPress={() => setTab(t_.key)}>
            <Text style={[styles.tabText, tab === t_.key && styles.tabTextActive]}>
              {t_.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {events.length === 0 ? (
        <EmptyState onExplore={() => navigation.navigate('Explore')} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <EventRow item={item} onPress={() => navigation.navigate('EventDetail', { event: item })} />
          )}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingBottom: 14,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center', marginRight: 8 },
  backArrow: { fontSize: 22, fontWeight: '600', color: '#1A1A2E' },
  headerTitle: { flex: 1, fontSize: 22, fontWeight: '700', color: '#1A1A2E' },
  headerRight: { flexDirection: 'row', gap: 4 },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20, marginBottom: 16,
    backgroundColor: '#F5F5FA', borderRadius: 30, padding: 4,
  },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 26, alignItems: 'center' },
  tabBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  tabText: { fontSize: 13, fontWeight: '600', color: '#999' },
  tabTextActive: { color: '#6C63FF' },

  // Empty state
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  illustrationCircle: {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: '#EEF0FF', alignItems: 'center', justifyContent: 'center',
    marginBottom: 28,
  },
  calendarIcon: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  calTop: { width: 70, height: 18, backgroundColor: '#FF5252', borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  calBody: {
    width: 70, height: 54, backgroundColor: '#fff',
    borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
    flexDirection: 'row', flexWrap: 'wrap',
    padding: 8, gap: 6,
    borderWidth: 1, borderColor: '#E0E0F0', borderTopWidth: 0,
  },
  calDot: { width: 8, height: 8, borderRadius: 2, backgroundColor: '#3A3A8C' },
  clockCircle: {
    position: 'absolute', bottom: 0, right: 0,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#2B9FFF', borderWidth: 3, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  clockHand: { position: 'absolute', width: 2, height: 10, backgroundColor: '#fff', borderRadius: 1, top: 5, left: 17 },
  clockHandMin: { position: 'absolute', width: 10, height: 2, backgroundColor: '#FFD166', borderRadius: 1, top: 17, left: 18 },

  emptyTitle: { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginBottom: 10, textAlign: 'center' },
  emptySubtitle: { fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 22, marginBottom: 36 },
  exploreBtn: {
    backgroundColor: '#6C63FF', borderRadius: 16,
    paddingVertical: 16, paddingHorizontal: 40,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    position: 'relative', width: '100%', justifyContent: 'center',
  },
  exploreBtnText: { fontSize: 14, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  exploreBtnArrow: {
    position: 'absolute', right: 12,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },

  // Event list
  list: { paddingHorizontal: 20, paddingTop: 4 },
  eventRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  rowThumb: { width: 72, height: 72, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  rowInfo: { flex: 1 },
  rowDate: { fontSize: 11, color: '#6C63FF', fontWeight: '600', marginBottom: 4 },
  rowTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', lineHeight: 20, marginBottom: 4 },
  rowLocRow: { flexDirection: 'row', alignItems: 'center' },
  rowLocIcon: { fontSize: 11, marginRight: 3 },
  rowLoc: { fontSize: 11, color: '#999', flex: 1 },
});
