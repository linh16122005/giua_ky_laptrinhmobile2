import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { key: 'sports', icon: '🏀', color: '#6C63FF' },
  { key: 'music',  icon: '🎵', color: '#CCC' },
  { key: 'arts',   icon: '🎨', color: '#6C63FF' },
  { key: 'food',   icon: '🍴', color: '#CCC' },
  { key: 'tech',   icon: '💻', color: '#CCC' },
];

const TIME_FILTERS = ['Today', 'Tomorrow', 'This week'];

export default function FilterScreen({ navigation, route }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [selectedCats, setSelectedCats] = useState(['sports', 'arts']);
  const [selectedTime, setSelectedTime] = useState('Tomorrow');
  const [priceMin, setPriceMin] = useState(20);
  const [priceMax, setPriceMax] = useState(120);
  const [sliderLeft, setSliderLeft] = useState(0.15);
  const [sliderRight, setSliderRight] = useState(0.85);

  const toggleCat = (key) => {
    setSelectedCats(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const TRACK_W = width - 80;

  return (
    <View style={styles.overlay}>
      <StatusBar barStyle="dark-content" />
      {/* Dim background tap to close */}
      <TouchableOpacity style={styles.backdrop} onPress={() => navigation.goBack()} />

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}>
        {/* Handle */}
        <View style={styles.handle} />

        <Text style={styles.title}>Filter</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.catRow}>
            {CATEGORIES.map(cat => {
              const active = selectedCats.includes(cat.key);
              return (
                <TouchableOpacity key={cat.key} style={styles.catItem} onPress={() => toggleCat(cat.key)}>
                  <View style={[styles.catCircle, active && styles.catCircleActive]}>
                    <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
                  </View>
                  <Text style={[styles.catLabel, active && styles.catLabelActive]}>
                    {t(`categories.${cat.key}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Time & Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Time &amp; Date</Text>
            <View style={styles.timeRow}>
              {TIME_FILTERS.map(tf => (
                <TouchableOpacity
                  key={tf}
                  style={[styles.timeChip, selectedTime === tf && styles.timeChipActive]}
                  onPress={() => setSelectedTime(tf)}>
                  <Text style={[styles.timeChipText, selectedTime === tf && styles.timeChipTextActive]}>
                    {tf}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.calendarRow}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>📅</Text>
              <Text style={styles.calendarText}>Choose from calendar</Text>
              <Text style={styles.calendarChevron}> ›</Text>
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <TouchableOpacity style={styles.locationRow}>
              <View style={styles.locationIcon}>
                <Text style={{ fontSize: 18 }}>📍</Text>
              </View>
              <Text style={styles.locationText}>New York, USA</Text>
              <Text style={styles.calendarChevron}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Price range */}
          <View style={styles.section}>
            <View style={styles.priceHeader}>
              <Text style={styles.sectionTitle}>Select price range</Text>
              <Text style={styles.priceValue}>${priceMin}-${priceMax}</Text>
            </View>

            {/* Fake histogram */}
            <View style={styles.histogram}>
              {[20,35,15,50,40,65,45,55,30,40,60,35,25].map((h, i) => (
                <View key={i} style={[styles.histBar, { height: h * 0.7 }]} />
              ))}
            </View>

            {/* Slider track */}
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, {
                left: sliderLeft * TRACK_W,
                right: TRACK_W - sliderRight * TRACK_W,
              }]} />
              {/* Left thumb */}
              <View style={[styles.sliderThumb, { left: sliderLeft * TRACK_W - 16 }]}>
                <Text style={{ fontSize: 10, color: '#666' }}>◁▷</Text>
              </View>
              {/* Right thumb */}
              <View style={[styles.sliderThumb, { left: sliderRight * TRACK_W - 16 }]}>
                <Text style={{ fontSize: 10, color: '#666' }}>◁▷</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              setSelectedCats([]);
              setSelectedTime('Today');
            }}>
            <Text style={styles.resetBtnText}>RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.applyBtnText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: 24, paddingTop: 12,
    maxHeight: '90%',
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0', alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginBottom: 20 },

  // Categories
  catRow: { paddingBottom: 4, gap: 16, paddingRight: 8 },
  catItem: { alignItems: 'center', width: 64 },
  catCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#F5F5FA', alignItems: 'center', justifyContent: 'center',
    marginBottom: 6, borderWidth: 2, borderColor: 'transparent',
  },
  catCircleActive: { backgroundColor: '#6C63FF', borderColor: '#4F46E5' },
  catLabel: { fontSize: 11, color: '#999', textAlign: 'center' },
  catLabelActive: { color: '#6C63FF', fontWeight: '600' },

  // Sections
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 14 },

  // Time
  timeRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  timeChip: {
    paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: 10, borderWidth: 1.5, borderColor: '#E8E8F0',
  },
  timeChipActive: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  timeChipText: { fontSize: 13, color: '#666', fontWeight: '500' },
  timeChipTextActive: { color: '#fff', fontWeight: '700' },
  calendarRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E8E8F0', borderRadius: 12,
    padding: 12,
  },
  calendarText: { flex: 1, fontSize: 14, color: '#999' },
  calendarChevron: { fontSize: 18, color: '#999' },

  // Location
  locationRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E8E8F0', borderRadius: 12, padding: 12,
  },
  locationIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  locationText: { flex: 1, fontSize: 14, color: '#1A1A2E', fontWeight: '500' },

  // Price
  priceHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  priceValue: { fontSize: 14, fontWeight: '700', color: '#6C63FF' },
  histogram: { flexDirection: 'row', alignItems: 'flex-end', height: 50, gap: 3, marginBottom: 8, opacity: 0.4 },
  histBar: { flex: 1, backgroundColor: '#6C63FF', borderRadius: 2, minHeight: 4 },
  sliderTrack: {
    height: 4, backgroundColor: '#E8E8F0', borderRadius: 2,
    marginHorizontal: 0, position: 'relative', marginBottom: 24,
  },
  sliderFill: { position: 'absolute', top: 0, bottom: 0, backgroundColor: '#6C63FF', borderRadius: 2 },
  sliderThumb: {
    position: 'absolute', top: -14,
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#E0E0F0',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 4,
  },

  // Buttons
  btnRow: { flexDirection: 'row', gap: 14, marginTop: 8 },
  resetBtn: {
    flex: 1, paddingVertical: 16, borderRadius: 14,
    borderWidth: 1.5, borderColor: '#E8E8F0', alignItems: 'center',
  },
  resetBtnText: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', letterSpacing: 1 },
  applyBtn: { flex: 2, backgroundColor: '#6C63FF', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  applyBtnText: { fontSize: 14, fontWeight: '700', color: '#fff', letterSpacing: 1 },
});
