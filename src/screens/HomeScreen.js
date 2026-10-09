import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, FlatList, Dimensions, StatusBar, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius, fonts, shadows } from '../theme';
import { CATEGORIES, EVENTS } from '../data/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.58;

function StarRating({ rating, size = 12 }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1,2,3,4,5].map(s => (
        <Text key={s} style={{ fontSize: size, color: s <= Math.round(rating) ? '#FFD166' : '#DDD' }}>★</Text>
      ))}
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(null);
  const [saved, setSaved] = useState([]);

  const toggleSave = (id) =>
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const catKeys = ['all', 'sports', 'music', 'food', 'arts', 'tech'];
  const catIcons = { all: '🎯', sports: '🏀', music: '🎵', food: '🍴', arts: '🎨', tech: '💻' };
  const catColors = { all: '#6C63FF', sports: '#FF6B6B', music: '#6C63FF', food: '#FF9F43', arts: '#FFD166', tech: '#06D6A0' };

  const upcomingEvents = EVENTS.slice(0, 4);
  const nearbyEvents = EVENTS.slice(2);

  const renderUpcomingCard = ({ item }) => (
    <TouchableOpacity
      style={styles.upcomingCard}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('EventDetail', { event: item })}>
      {/* Image placeholder */}
      <View style={styles.upcomingImg}>
        <Text style={styles.upcomingEmoji}>
          {item.categoryId === '1' ? '🎵' : item.categoryId === '2' ? '⚽' : item.categoryId === '3' ? '🎨' : item.categoryId === '4' ? '💻' : '🍜'}
        </Text>
        {/* Date badge */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateBadgeDay}>{new Date(item.date).getDate()}</Text>
          <Text style={styles.dateBadgeMonth}>
            {new Date(item.date).toLocaleString('en', { month: 'short' }).toUpperCase()}
          </Text>
        </View>
        {/* Bookmark */}
        <TouchableOpacity style={styles.cardBookmark} onPress={() => toggleSave(item.id)}>
          <Text style={{ fontSize: 16 }}>{saved.includes(item.id) ? '🔖' : '🔖'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.upcomingInfo}>
        <Text style={styles.upcomingTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.goingRow}>
          <View style={styles.avatarGroup}>
            {['👤','👤','👤'].map((a,i) => (
              <View key={i} style={[styles.avatar, { marginLeft: i > 0 ? -8 : 0 }]}>
                <Text style={{ fontSize: 10 }}>{a}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.goingText}>+20 {t('common.going')}</Text>
        </View>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderNearbyRow = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.nearbyCard}
      onPress={() => navigation.navigate('EventDetail', { event: item })}>
      <View style={styles.nearbyThumb}>
        <Text style={{ fontSize: 22 }}>
          {item.categoryId === '1' ? '🎵' : item.categoryId === '2' ? '⚽' : '🎨'}
        </Text>
      </View>
      <View style={styles.nearbyInfo}>
        <Text style={styles.nearbyDate}>
          {new Date(item.date).toLocaleDateString('en', { day:'2-digit', month:'short' })} • {item.time}
        </Text>
        <Text style={styles.nearbyTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.nearbyLocation} numberOfLines={1}>{item.location}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => toggleSave(item.id)}>
        <Text style={{ fontSize: 20 }}>{saved.includes(item.id) ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Purple header */}
      <LinearGradient
        colors={['#6C63FF', '#4F46E5']}
        style={[styles.header, { paddingTop: insets.top + 12 }]}>
        {/* Top row */}
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.openDrawer?.()}>
            <View style={styles.menuBtn}>
              {[0,1,2].map(i => <View key={i} style={styles.menuLine} />)}
            </View>
          </TouchableOpacity>
          <View style={styles.locationArea}>
            <Text style={styles.locationLabel}>{t('common.currentLocation')} ▾</Text>
            <Text style={styles.locationCity}>New York, USA</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={t('common.search')}
            placeholderTextColor="#AAAACC"
            value={search}
            onChangeText={setSearch}
            onFocus={() => navigation.navigate('Search')}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>⚙ {t('common.filters')}</Text>
          </TouchableOpacity>
        </View>

        {/* Category chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          style={styles.catScroll} contentContainerStyle={{ paddingRight: 16 }}>
          {catKeys.map(key => (
            <TouchableOpacity
              key={key}
              style={[styles.catChip,
                { backgroundColor: catColors[key] },
                selectedCat === key && styles.catChipSelected,
              ]}
              onPress={() => setSelectedCat(selectedCat === key ? null : key)}>
              <Text style={styles.catChipText}>{catIcons[key]} {t(`categories.${key}`, key === 'all' ? t('home.all') : '')}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.upcomingEvents')}</Text>
            <TouchableOpacity><Text style={styles.seeAll}>{t('common.seeAll')} ›</Text></TouchableOpacity>
          </View>
          <FlatList
            data={upcomingEvents}
            renderItem={renderUpcomingCard}
            keyExtractor={i => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + spacing.md}
            decelerationRate="fast"
            contentContainerStyle={{ paddingRight: spacing.lg }}
          />
        </View>

        {/* Invite Banner */}
        <View style={styles.inviteBanner}>
          <View style={styles.inviteText}>
            <Text style={styles.inviteTitle}>{t('home.inviteTitle')}</Text>
            <Text style={styles.inviteSubtitle}>{t('home.inviteSubtitle')}</Text>
            <TouchableOpacity style={styles.inviteBtn}>
              <Text style={styles.inviteBtnText}>{t('common.invite').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inviteEmoji}>🎁</Text>
        </View>

        {/* Nearby You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.nearbyYou')}</Text>
            <TouchableOpacity><Text style={styles.seeAll}>{t('common.seeAll')} ›</Text></TouchableOpacity>
          </View>
          {nearbyEvents.map(renderNearbyRow)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8FC' },

  // Header
  header: { paddingHorizontal: 20, paddingBottom: 16 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  menuBtn: { gap: 4, padding: 4 },
  menuLine: { width: 20, height: 2.5, backgroundColor: '#fff', borderRadius: 2 },
  locationArea: { alignItems: 'center' },
  locationLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)' },
  locationCity: { fontSize: 15, fontWeight: '700', color: '#fff' },
  bellBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  bellDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF6B6B', borderWidth: 1.5, borderColor: '#6C63FF' },

  // Search
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 14 },
  searchIcon: { fontSize: 16, marginRight: 8, color: '#999' },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  filterBtn: { backgroundColor: '#6C63FF', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  filterText: { fontSize: 11, color: '#fff', fontWeight: '600' },

  // Categories
  catScroll: { marginBottom: 4 },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, marginRight: 10 },
  catChipSelected: { opacity: 0.7 },
  catChipText: { fontSize: 13, color: '#fff', fontWeight: '600' },

  // Scroll
  scroll: { flex: 1 },
  section: { paddingHorizontal: 20, marginTop: 22 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A2E' },
  seeAll: { fontSize: 13, color: '#6C63FF', fontWeight: '600' },

  // Upcoming card
  upcomingCard: { width: CARD_WIDTH, marginRight: 14, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', ...shadows.md },
  upcomingImg: { height: 140, backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  upcomingEmoji: { fontSize: 48 },
  dateBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: '#FF6B6B', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, alignItems: 'center' },
  dateBadgeDay: { fontSize: 14, fontWeight: '800', color: '#fff', lineHeight: 16 },
  dateBadgeMonth: { fontSize: 9, color: '#fff', lineHeight: 11 },
  cardBookmark: { position: 'absolute', top: 10, right: 10, backgroundColor: '#fff', borderRadius: 8, padding: 4 },
  upcomingInfo: { padding: 12 },
  upcomingTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 8, lineHeight: 20 },
  goingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  avatarGroup: { flexDirection: 'row', marginRight: 6 },
  avatar: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#E0DFFF', borderWidth: 1.5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  goingText: { fontSize: 12, color: '#6C63FF', fontWeight: '600' },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { fontSize: 11, marginRight: 4 },
  locationText: { fontSize: 11, color: '#999', flex: 1 },

  // Invite banner
  inviteBanner: {
    marginHorizontal: 20, marginTop: 22, borderRadius: 16,
    backgroundColor: '#E8F4FD', padding: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  inviteText: { flex: 1 },
  inviteTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  inviteSubtitle: { fontSize: 12, color: '#666', marginBottom: 12 },
  inviteBtn: { backgroundColor: '#6C63FF', borderRadius: 10, paddingHorizontal: 18, paddingVertical: 8, alignSelf: 'flex-start' },
  inviteBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  inviteEmoji: { fontSize: 52, marginLeft: 10 },

  // Nearby
  nearbyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 12, marginBottom: 10, ...shadows.sm },
  nearbyThumb: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  nearbyInfo: { flex: 1 },
  nearbyDate: { fontSize: 11, color: '#6C63FF', fontWeight: '600', marginBottom: 3 },
  nearbyTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', marginBottom: 3, lineHeight: 18 },
  nearbyLocation: { fontSize: 11, color: '#999', flex: 1 },
});
