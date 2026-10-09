import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Dimensions, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { EVENTS } from '../data/mockData';

const { width, height } = Dimensions.get('window');

// Mock map pins
const MAP_PINS = [
  { id: '1', top: '22%', left: '18%', color: '#6C63FF', icon: '🎵', eventId: '1' },
  { id: '2', top: '40%', left: '55%', color: '#FF6B6B', icon: '⚽', eventId: '2' },
  { id: '3', top: '58%', left: '12%', color: '#FF9F43', icon: '🍜', eventId: '5' },
  { id: '4', top: '68%', left: '60%', color: '#6C63FF', icon: '🎨', eventId: '3' },
];

const CAT_KEYS = ['sports', 'music', 'food'];
const CAT_ICONS = { sports: '🏀', music: '🎵', food: '🍴' };

export default function MapScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [selectedPin, setSelectedPin] = useState(MAP_PINS[0]);
  const [selectedCat, setSelectedCat] = useState(null);

  const selectedEvent = EVENTS.find(e => e.id === selectedPin.eventId) || EVENTS[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF5" />

      {/* Map background */}
      <View style={styles.map}>
        {/* Grid lines */}
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map(v => (
          <View key={`h${v}`} style={[styles.gridH, { top: `${v * 100}%` }]} />
        ))}
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map(v => (
          <View key={`v${v}`} style={[styles.gridV, { left: `${v * 100}%` }]} />
        ))}

        {/* Road lines (decorative) */}
        <View style={[styles.road, { top: '35%', left: 0, right: 0, height: 6 }]} />
        <View style={[styles.road, { top: '65%', left: 0, right: 0, height: 4 }]} />
        <View style={[styles.road, { left: '40%', top: 0, bottom: 0, width: 5 }]} />

        {/* Area label */}
        <Text style={styles.areaLabel}>NORTHEAST{'\n'}BELLEVUE</Text>

        {/* Map pins */}
        {MAP_PINS.map(pin => (
          <TouchableOpacity
            key={pin.id}
            style={[styles.pin, { top: pin.top, left: pin.left }]}
            onPress={() => setSelectedPin(pin)}>
            <View style={[styles.pinIcon, { backgroundColor: pin.color },
              selectedPin.id === pin.id && styles.pinIconActive]}>
              <Text style={{ fontSize: 14 }}>{pin.icon}</Text>
            </View>
            {selectedPin.id === pin.id && <View style={[styles.pinDot, { backgroundColor: pin.color }]} />}
          </TouchableOpacity>
        ))}

        {/* GPS button */}
        <TouchableOpacity style={[styles.gpsBtn, { bottom: 200, right: 16 }]}>
          <Text style={{ fontSize: 20 }}>⊕</Text>
        </TouchableOpacity>
      </View>

      {/* Top overlay: Search + Categories */}
      <View style={[styles.topOverlay, { paddingTop: insets.top + 10 }]}>
        {/* Search bar */}
        <View style={styles.searchRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Search')}>
            <Text style={styles.searchPlaceholder}>{t('map.findFood')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gpsSmallBtn}>
            <Text style={{ fontSize: 16 }}>⊕</Text>
          </TouchableOpacity>
        </View>

        {/* Category chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}>
          {CAT_KEYS.map(key => (
            <TouchableOpacity
              key={key}
              style={[styles.catChip, selectedCat === key && styles.catChipActive]}
              onPress={() => setSelectedCat(selectedCat === key ? null : key)}>
              <Text style={{ fontSize: 12, marginRight: 4 }}>{CAT_ICONS[key]}</Text>
              <Text style={[styles.catText, selectedCat === key && styles.catTextActive]}>
                {t(`categories.${key}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bottom event card */}
      <TouchableOpacity
        style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}
        onPress={() => navigation.navigate('EventDetail', { event: selectedEvent })}
        activeOpacity={0.9}>
        <View style={styles.bottomCardInner}>
          <View style={styles.bottomThumb}>
            <Text style={{ fontSize: 28 }}>🎵</Text>
          </View>
          <View style={styles.bottomInfo}>
            <Text style={styles.bottomDate}>
              {new Date(selectedEvent.date).toLocaleDateString('en', {
                weekday: 'short', month: 'short', day: 'numeric'
              })} • {selectedEvent.time}
            </Text>
            <Text style={styles.bottomTitle} numberOfLines={2}>{selectedEvent.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.bottomLocIcon}>📍</Text>
              <Text style={styles.bottomLoc} numberOfLines={1}>{selectedEvent.location}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bookmarkBtn}>
            <Text style={{ fontSize: 20 }}>🔖</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Map
  map: { flex: 1, backgroundColor: '#E8EBF5', position: 'relative' },
  gridH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.7)' },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.7)' },
  road: { position: 'absolute', backgroundColor: '#fff' },
  areaLabel: {
    position: 'absolute', top: '42%', right: '8%',
    fontSize: 11, fontWeight: '700', color: '#AAA',
    textAlign: 'right', lineHeight: 15,
  },
  pin: { position: 'absolute', alignItems: 'center' },
  pinIcon: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 6,
  },
  pinIconActive: { width: 48, height: 48, borderRadius: 24, borderWidth: 3, borderColor: '#fff' },
  pinDot: { width: 8, height: 8, borderRadius: 4, marginTop: 2 },
  gpsBtn: {
    position: 'absolute',
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 5,
  },

  // Top overlay
  topOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0,
    paddingHorizontal: 16,
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  backArrow: { fontSize: 22, color: '#333', fontWeight: '700' },
  searchBar: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 11,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
  },
  searchPlaceholder: { fontSize: 13, color: '#AAA' },
  gpsSmallBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  catScroll: { paddingBottom: 8, gap: 8 },
  catChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 7,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
    borderWidth: 1, borderColor: '#F0F0F0',
  },
  catChipActive: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  catText: { fontSize: 13, color: '#333', fontWeight: '500' },
  catTextActive: { color: '#fff', fontWeight: '700' },

  // Bottom card
  bottomCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingTop: 16, paddingHorizontal: 20,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 20, elevation: 12,
  },
  bottomCardInner: { flexDirection: 'row', alignItems: 'center' },
  bottomThumb: {
    width: 72, height: 72, borderRadius: 14,
    backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center',
    marginRight: 14,
  },
  bottomInfo: { flex: 1 },
  bottomDate: { fontSize: 11, color: '#6C63FF', fontWeight: '600', marginBottom: 4 },
  bottomTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', lineHeight: 20, marginBottom: 4 },
  bottomLocIcon: { fontSize: 11, marginRight: 3 },
  bottomLoc: { fontSize: 11, color: '#999', flex: 1 },
  bookmarkBtn: { marginLeft: 8 },
});
