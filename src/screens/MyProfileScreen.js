import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const INTERESTS = [
  { label: 'Games Online', color: '#FF9F43' },
  { label: 'Concert',      color: '#6C63FF' },
  { label: 'Music',        color: '#6C63FF' },
  { label: 'Art',          color: '#FF6B6B' },
  { label: 'Movie',        color: '#06D6A0' },
  { label: 'Others',       color: '#A29BFE' },
];

export default function MyProfileScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('Ashfak Sayem');
  const [bio, setBio] = useState(
    'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.'
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.title')}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Text style={{ fontSize: 48 }}>👤</Text>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Text style={{ fontSize: 14 }}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{name}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>350</Text>
              <Text style={styles.statLabel}>{t('profile.following')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>346</Text>
              <Text style={styles.statLabel}>{t('profile.followers')}</Text>
            </View>
          </View>

          {/* Edit Profile */}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditMode(!editMode)}>
            <Text style={{ fontSize: 14, marginRight: 6 }}>✏️</Text>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* About Me */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          {editMode ? (
            <TextInput
              style={styles.bioInput}
              value={bio}
              onChangeText={setBio}
              multiline
              textAlignVertical="top"
            />
          ) : (
            <Text style={styles.bioText}>
              {bio.slice(0, 120)}
              <Text style={styles.readMore}> Read More</Text>
            </Text>
          )}
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <View style={styles.interestHeader}>
            <Text style={styles.sectionTitle}>Interest</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>✏️ CHANGE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagsRow}>
            {INTERESTS.map(tag => (
              <View key={tag.label} style={[styles.tag, { backgroundColor: tag.color }]}>
                <Text style={styles.tagText}>{tag.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingBottom: 14,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center' },
  backArrow: { fontSize: 22, fontWeight: '600', color: '#1A1A2E' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#1A1A2E' },

  avatarSection: { alignItems: 'center', paddingVertical: 20 },
  avatarWrap: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12, position: 'relative',
  },
  editAvatarBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#6C63FF', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  userName: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 16 },

  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  statItem: { alignItems: 'center', paddingHorizontal: 32 },
  statVal: { fontSize: 20, fontWeight: '800', color: '#1A1A2E', marginBottom: 2 },
  statLabel: { fontSize: 12, color: '#999' },
  statDivider: { width: 1, height: 36, backgroundColor: '#E8E8F0' },

  editBtn: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E8E8F0', borderRadius: 12,
    paddingHorizontal: 24, paddingVertical: 10,
  },
  editBtnText: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },

  section: {
    paddingHorizontal: 24, marginTop: 24,
    borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 10 },
  bioText: { fontSize: 14, color: '#666', lineHeight: 22 },
  bioInput: {
    fontSize: 14, color: '#333', lineHeight: 22,
    borderWidth: 1, borderColor: '#E8E8F0', borderRadius: 10,
    padding: 12, minHeight: 80,
  },
  readMore: { color: '#6C63FF', fontWeight: '600' },

  interestHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  changeText: { fontSize: 12, color: '#6C63FF', fontWeight: '600' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tag: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  tagText: { fontSize: 13, color: '#fff', fontWeight: '600' },
});
