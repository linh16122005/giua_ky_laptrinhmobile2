import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  FlatList, StatusBar, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { EVENTS } from '../data/mockData';

const { width } = Dimensions.get('window');

const EMOJI_MAP = { '1': '🎵', '2': '⚽', '3': '🎨', '4': '💻', '5': '🍜', '6': '✈️' };
const COLOR_MAP = { '1': '#F0EFFF', '2': '#FFE8E8', '3': '#FFF8E1', '4': '#E8FFF5', '5': '#FFE8F5', '6': '#E8F4FF' };

export default function SearchScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const results = query.length > 0
    ? EVENTS.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.location.toLowerCase().includes(query.toLowerCase()))
    : EVENTS;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
      activeOpacity={0.85}>
      <View style={[styles.thumb, { backgroundColor: COLOR_MAP[item.categoryId] || '#F0EFFF' }]}>
        <Text style={{ fontSize: 28 }}>{EMOJI_MAP[item.categoryId] || '🎪'}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.resultDate}>
          {new Date(item.date).toLocaleDateString('en', { day: '2-digit', month: 'short' }).toUpperCase()} • {item.time}
        </Text>
        <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('search.title')}</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchArea}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={t('search.placeholder')}
            placeholderTextColor="#AAAAAA"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={{ color: '#AAA', fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>{t('search.noResults')}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingBottom: 14,
  },
  backBtn: { marginRight: 16, width: 36, height: 36, justifyContent: 'center' },
  backArrow: { fontSize: 22, fontWeight: '600', color: '#1A1A2E' },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#1A1A2E' },

  searchArea: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingBottom: 14, gap: 10,
  },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E8E8F0', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#FAFAFA',
  },
  searchIcon: { fontSize: 16, marginRight: 8, color: '#999' },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  filterBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#6C63FF', alignItems: 'center', justifyContent: 'center',
  },
  filterText: { fontSize: 20, color: '#fff' },

  list: { paddingHorizontal: 20, paddingTop: 4 },
  resultCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  thumb: {
    width: 72, height: 72, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  info: { flex: 1 },
  resultDate: { fontSize: 11, color: '#6C63FF', fontWeight: '600', marginBottom: 4 },
  resultTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', lineHeight: 20, marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { fontSize: 11, marginRight: 3 },
  locationText: { fontSize: 11, color: '#999', flex: 1 },

  emptyState: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#999' },
});
