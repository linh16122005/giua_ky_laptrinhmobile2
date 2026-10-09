import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// ─── Slide illustrations ────────────────────────────────────────────────────

function Slide1Illustration() {
  return (
    <View style={il.phone}>
      {/* Phone frame */}
      <View style={il.screen}>
        {/* Header */}
        <View style={il.header}>
          <View style={il.menuIcon}>
            {[0,1,2].map(i => <View key={i} style={il.menuLine} />)}
          </View>
          <View>
            <Text style={il.locationLabel}>Current Location ▾</Text>
            <Text style={il.locationValue}>New York, USA</Text>
          </View>
          <View style={il.bellIcon}><Text style={{ fontSize: 16 }}>🔔</Text></View>
        </View>

        {/* Search bar */}
        <View style={il.searchBar}>
          <Text style={il.searchIcon}>🔍</Text>
          <Text style={il.searchPlaceholder}>Search…</Text>
          <View style={il.filterBtn}><Text style={il.filterText}>⚙ Filters</Text></View>
        </View>

        {/* Category chips */}
        <View style={il.chips}>
          {[
            { icon: '🏀', label: 'Sports', color: '#FF6B6B' },
            { icon: '🎵', label: 'Music', color: '#6C63FF' },
            { icon: '🍴', label: 'Food', color: '#FF9F43' },
          ].map(c => (
            <View key={c.label} style={[il.chip, { backgroundColor: c.color }]}>
              <Text style={il.chipText}>{c.icon} {c.label}</Text>
            </View>
          ))}
        </View>

        {/* Section */}
        <View style={il.sectionRow}>
          <Text style={il.sectionTitle}>Upcoming Events</Text>
          <Text style={il.seeAll}>See All ›</Text>
        </View>

        {/* Event cards row */}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {[
            { color: '#2ECC71', title: 'International Jazz Day' },
            { color: '#E67E22', title: 'Internatio…' },
          ].map((e, i) => (
            <View key={i} style={il.eventCard}>
              <View style={[il.eventImg, { backgroundColor: e.color + '40' }]}>
                <Text style={{ fontSize: 24 }}>{i === 0 ? '🎷' : '🎸'}</Text>
                <View style={il.dateTag}>
                  <Text style={il.dateTagTop}>10</Text>
                  <Text style={il.dateTagBot}>JUNE</Text>
                </View>
              </View>
              <Text style={il.eventTitle} numberOfLines={1}>{e.title}</Text>
              <Text style={il.eventMeta}>👥 +20  📍 London</Text>
            </View>
          ))}
        </View>

        {/* Nearby */}
        <View style={il.sectionRow}>
          <Text style={il.sectionTitle}>Nearby You</Text>
          <Text style={il.seeAll}>See All ›</Text>
        </View>
        <View style={il.nearbyCard}>
          <View style={il.nearbyThumb}><Text style={{ fontSize: 20 }}>🎶</Text></View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={il.nearbyDate}>10 June • 9:00 PM</Text>
            <Text style={il.nearbyTitle}>International Gala Music Festival</Text>
          </View>
          <Text>🔖</Text>
        </View>
      </View>
    </View>
  );
}

function Slide2Illustration() {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const weeks = [
    [31,1,2,3,4,5,6],
    [7,8,9,10,11,12,13],
    [14,15,16,17,18,19,20],
    [21,22,23,24,25,26,27],
    [28,29,30,31,1,2,3],
  ];
  const highlights = { 10: '#FF6B6B', 15: '#6C63FF', 22: '#FF9F43', 25: '#6C63FF' };

  return (
    <View style={il.phone}>
      <View style={il.screen}>
        {/* Cal header */}
        <View style={il.calHeader}>
          <Text style={{ fontSize: 12 }}>← </Text>
          <Text style={il.calTitle}>Calendar ▲</Text>
          <Text style={{ fontSize: 18 }}>⋯</Text>
        </View>
        <View style={il.monthRow}>
          <Text style={il.chevron}>‹</Text>
          <Text style={il.monthLabel}>March 2021</Text>
          <Text style={il.chevron}>›</Text>
        </View>

        {/* Day headers */}
        <View style={il.calRow}>
          {days.map(d => (
            <Text key={d} style={il.dayHeader}>{d}</Text>
          ))}
        </View>

        {/* Weeks */}
        {weeks.map((week, wi) => (
          <View key={wi} style={il.calRow}>
            {week.map((d, di) => {
              const hl = highlights[d];
              const isOtherMonth = (wi === 0 && d > 20) || (wi === 4 && d < 10);
              return (
                <View key={di} style={[il.dayCell, hl && { backgroundColor: hl, borderRadius: 12 }]}>
                  <Text style={[il.dayNum, hl && { color: '#fff' }, isOtherMonth && { color: '#CCC' }]}>
                    {d}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}

        {/* Event list */}
        <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'flex-start' }}>
          <View style={il.calDateBadge}>
            <Text style={il.calDateMonth}>Mar</Text>
            <Text style={il.calDateNum}>15</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={il.calDayLabel}>MON, 15TH MARCH, 2021</Text>
            <View style={[il.calEvent, { backgroundColor: '#FF9F43' }]}>
              <View style={il.calEventThumb}><Text style={{ fontSize: 16 }}>🎵</Text></View>
              <View>
                <Text style={il.calEventTime}>11:00 am – 12:30 pm</Text>
                <Text style={il.calEventName}>Gala Music Festival.</Text>
              </View>
            </View>
            <View style={[il.calEvent, { backgroundColor: '#A29BFE' }]}>
              <View style={il.calEventThumb}><Text style={{ fontSize: 16 }}>👩</Text></View>
              <View>
                <Text style={il.calEventTime}>11:00 am – 12:30 pm</Text>
                <Text style={il.calEventName}>Women's Leadership.</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function Slide3Illustration() {
  return (
    <View style={il.phone}>
      <View style={[il.screen, { padding: 0, overflow: 'hidden' }]}>
        {/* Map background */}
        <View style={il.mapBg}>
          {/* Grid lines */}
          {[0.2,0.4,0.6,0.8].map(v => (
            <View key={v} style={[il.mapLine, { top: `${v*100}%` }]} />
          ))}
          {[0.2,0.4,0.6,0.8].map(v => (
            <View key={v} style={[il.mapLineV, { left: `${v*100}%` }]} />
          ))}

          {/* Search bar overlay */}
          <View style={il.mapSearch}>
            <Text style={{ fontSize: 10, color: '#999' }}>← </Text>
            <View style={il.mapSearchBar}>
              <Text style={{ fontSize: 9, color: '#999' }}>🔍  Search event, location etc.</Text>
            </View>
            <Text style={{ fontSize: 16 }}>🗂</Text>
          </View>

          {/* Category chips on map */}
          <View style={[il.chips, { marginTop: 4 }]}>
            {[
              { icon: '🏀', label: 'Sports', color: '#FF6B6B' },
              { icon: '🎵', label: 'Music', color: '#6C63FF' },
              { icon: '🍴', label: 'Food', color: '#FF9F43' },
            ].map(c => (
              <View key={c.label} style={[il.chip, { backgroundColor: c.color, paddingVertical: 2, paddingHorizontal: 6 }]}>
                <Text style={[il.chipText, { fontSize: 8 }]}>{c.icon} {c.label}</Text>
              </View>
            ))}
          </View>

          {/* Map pins */}
          {[
            { top: '30%', left: '20%', color: '#6C63FF', icon: '🎵', label: 'Music concert', price: '$90' },
            { top: '50%', left: '55%', color: '#FF6B6B', icon: '🏀', label: 'Football match', price: '$30' },
            { top: '65%', left: '10%', color: '#FF9F43', icon: '🍴', label: 'Food festival', price: '$10' },
            { top: '75%', left: '62%', color: '#6C63FF', icon: '🎨', label: 'Art show', price: '$30' },
          ].map((pin, i) => (
            <View key={i} style={[il.mapPin, { top: pin.top, left: pin.left }]}>
              <View style={[il.mapPinIcon, { backgroundColor: pin.color }]}>
                <Text style={{ fontSize: 10 }}>{pin.icon}</Text>
              </View>
              <View style={il.mapPinLabel}>
                <Text style={il.mapPinPrice}>{pin.price}</Text>
                <Text style={il.mapPinName}>{pin.label}</Text>
              </View>
            </View>
          ))}

          {/* Location btn */}
          <View style={il.mapLocBtn}><Text style={{ fontSize: 14 }}>⊕</Text></View>
        </View>
      </View>
    </View>
  );
}

// ─── Slide data ─────────────────────────────────────────────────────────────

const SLIDES = [
  {
    key: '1',
    Illustration: Slide1Illustration,
    title: 'Explore Upcoming and\nNearby Events',
    subtitle: 'In publishing and graphic design, Lorem is a placeholder text commonly',
  },
  {
    key: '2',
    Illustration: Slide2Illustration,
    title: 'We Have Modern Events\nCalendar Feature',
    subtitle: 'In publishing and graphic design, Lorem is a placeholder text commonly',
  },
  {
    key: '3',
    Illustration: Slide3Illustration,
    title: 'To Look Up More Events or\nActivities Nearby By Map',
    subtitle: 'In publishing and graphic design, Lorem is a placeholder text commonly',
  },
];

// ─── Main component ─────────────────────────────────────────────────────────

export default function OnboardingScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('SignIn');
    }
  };

  const skip = () => navigation.replace('SignIn');

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FF" />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfig.current}
        renderItem={({ item }) => {
          const { Illustration, title, subtitle } = item;
          return (
            <View style={styles.slide}>
              {/* Top: light background + phone illustration */}
              <View style={styles.topSection}>
                <Illustration />
              </View>

              {/* Bottom: purple card */}
              <View style={styles.bottomCard}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardSubtitle}>{subtitle}</Text>

                {/* Footer: Skip · dots · Next */}
                <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
                  <TouchableOpacity onPress={skip}>
                    <Text style={styles.skipText}>Skip</Text>
                  </TouchableOpacity>

                  {/* Dots */}
                  <View style={styles.dots}>
                    {SLIDES.map((_, i) => (
                      <View
                        key={i}
                        style={[styles.dot, i === currentIndex && styles.dotActive]}
                      />
                    ))}
                  </View>

                  <TouchableOpacity onPress={goNext}>
                    <Text style={styles.nextText}>
                      {currentIndex === SLIDES.length - 1 ? 'Start' : 'Next'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5FF' },
  slide: { width, flex: 1 },

  topSection: {
    flex: 1,
    backgroundColor: '#F0EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
  },

  bottomCard: {
    backgroundColor: '#5B4EFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 32,
    paddingHorizontal: 28,
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
    minWidth: 48,
  },
  nextText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '700',
    minWidth: 48,
    textAlign: 'right',
  },
  dots: { flexDirection: 'row', gap: 6 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: {
    width: 20,
    backgroundColor: '#FFFFFF',
  },
});

// ─── Illustration styles ─────────────────────────────────────────────────────

const il = StyleSheet.create({
  phone: {
    width: width * 0.72,
    height: height * 0.42,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    shadowColor: '#5B4EFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden',
  },
  screen: {
    flex: 1,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },

  // Slide 1
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  menuIcon: { gap: 3 },
  menuLine: { width: 14, height: 2, backgroundColor: '#333', borderRadius: 1 },
  bellIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center' },
  locationLabel: { fontSize: 7, color: '#999', textAlign: 'center' },
  locationValue: { fontSize: 9, fontWeight: '700', color: '#222' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5FA', borderRadius: 8, padding: 6, marginBottom: 8 },
  searchIcon: { fontSize: 10, marginRight: 4 },
  searchPlaceholder: { flex: 1, fontSize: 9, color: '#AAA' },
  filterBtn: { backgroundColor: '#5B4EFF', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  filterText: { fontSize: 7, color: '#FFF' },
  chips: { flexDirection: 'row', marginBottom: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, marginRight: 6 },
  chipText: { fontSize: 9, color: '#FFF', fontWeight: '600' },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  sectionTitle: { fontSize: 10, fontWeight: '700', color: '#222' },
  seeAll: { fontSize: 8, color: '#5B4EFF' },
  eventCard: { flex: 1, backgroundColor: '#F8F8FC', borderRadius: 10, overflow: 'hidden' },
  eventImg: { height: 60, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  dateTag: { position: 'absolute', top: 4, left: 4, backgroundColor: '#FF6B6B', borderRadius: 4, paddingHorizontal: 4, alignItems: 'center' },
  dateTagTop: { fontSize: 9, color: '#FFF', fontWeight: '700', lineHeight: 11 },
  dateTagBot: { fontSize: 6, color: '#FFF', lineHeight: 8 },
  eventTitle: { fontSize: 8, fontWeight: '700', color: '#222', padding: 4 },
  eventMeta: { fontSize: 7, color: '#999', paddingHorizontal: 4, paddingBottom: 4 },
  nearbyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8FC', borderRadius: 8, padding: 6 },
  nearbyThumb: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#A29BFE', alignItems: 'center', justifyContent: 'center' },
  nearbyDate: { fontSize: 7, color: '#999' },
  nearbyTitle: { fontSize: 8, fontWeight: '600', color: '#222' },

  // Slide 2
  calHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  calTitle: { fontSize: 11, fontWeight: '700', color: '#222' },
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 4, gap: 12 },
  chevron: { fontSize: 14, color: '#5B4EFF', fontWeight: '700' },
  monthLabel: { fontSize: 10, fontWeight: '700', color: '#222' },
  calRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 2 },
  dayHeader: { width: 22, textAlign: 'center', fontSize: 7, color: '#AAA', fontWeight: '600' },
  dayCell: { width: 22, height: 18, alignItems: 'center', justifyContent: 'center' },
  dayNum: { fontSize: 8, color: '#333' },
  calDateBadge: { alignItems: 'center', marginRight: 6, marginTop: 2 },
  calDateMonth: { fontSize: 7, color: '#5B4EFF', fontWeight: '600' },
  calDateNum: { fontSize: 14, fontWeight: '800', color: '#5B4EFF', lineHeight: 16 },
  calDayLabel: { fontSize: 7, color: '#999', marginBottom: 4 },
  calEvent: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, padding: 6, marginBottom: 4 },
  calEventThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center', marginRight: 6 },
  calEventTime: { fontSize: 7, color: 'rgba(255,255,255,0.8)' },
  calEventName: { fontSize: 8, fontWeight: '700', color: '#FFF' },

  // Slide 3 – Map
  mapBg: {
    flex: 1,
    backgroundColor: '#E8EBF5',
    position: 'relative',
    padding: 10,
  },
  mapLine: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.6)' },
  mapLineV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.6)' },
  mapSearch: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, zIndex: 10 },
  mapSearchBar: { flex: 1, backgroundColor: '#FFF', borderRadius: 8, paddingVertical: 5, paddingHorizontal: 8, marginHorizontal: 4 },
  mapPin: { position: 'absolute', flexDirection: 'row', alignItems: 'center', zIndex: 5 },
  mapPinIcon: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginRight: 4 },
  mapPinLabel: { backgroundColor: '#FFF', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  mapPinPrice: { fontSize: 7, fontWeight: '700', color: '#5B4EFF' },
  mapPinName: { fontSize: 7, color: '#333' },
  mapLocBtn: { position: 'absolute', bottom: 12, right: 12, width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', elevation: 4 },
});
