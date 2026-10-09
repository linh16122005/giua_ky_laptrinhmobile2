import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { EVENTS } from '../data/mockData';

const TABS = ['ABOUT', 'EVENT', 'REVIEWS'];

export default function OrganizerProfileScreen({ navigation, route }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('ABOUT');
  const [isFollowing, setIsFollowing] = useState(false);

  const organizer = route?.params?.organizer || {
    name: 'David Silbia',
    following: 350,
    followers: 346,
    bio: 'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ABOUT':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.bioText}>
              {organizer.bio}
              <Text style={styles.readMore}> Read More</Text>
            </Text>
          </View>
        );
      case 'EVENT':
        return (
          <View style={styles.tabContent}>
            {EVENTS.slice(0, 5).map((e, idx) => {
              const BG = ['#F0EFFF','#FFF0E8','#E8FFF5','#FFF8E1','#FFE8F5'];
              const EMOJI = { '1':'🎵', '2':'⚽', '3':'🎨', '4':'💻', '5':'🍜' };
              return (
                <TouchableOpacity
                  key={e.id}
                  style={styles.eventRow}
                  onPress={() => navigation.navigate('EventDetail', { event: e })}>
                  <View style={[styles.eventThumb, { backgroundColor: BG[idx % BG.length] }]}>
                    <Text style={{ fontSize: 24 }}>{EMOJI[e.categoryId] || '🎪'}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventDate}>
                      {new Date(e.date).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })} · {e.time}
                    </Text>
                    <Text style={styles.eventTitle} numberOfLines={2}>{e.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 10, color: '#999', marginRight: 3 }}>📍</Text>
                      <Text style={styles.eventLoc} numberOfLines={1}>{e.location}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      case 'REVIEWS':
        return (
          <View style={styles.tabContent}>
            {[
              { name: 'Rocks Velkeinjen', date: '10 Feb', rating: 4, comment: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.' },
              { name: 'Angelina Zolly',  date: '10 Feb', rating: 4, comment: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.' },
              { name: 'Zenifero Bolex',  date: '8 Feb',  rating: 5, comment: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.' },
            ].map((r, i) => (
              <View key={i} style={styles.reviewRow}>
                <View style={styles.reviewAvatar}><Text style={{ fontSize: 18 }}>👤</Text></View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                    <Text style={styles.reviewName}>{r.name}</Text>
                    <Text style={styles.reviewDate}>{r.date}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                    {[1,2,3,4,5].map(s => (
                      <Text key={s} style={{ fontSize: 14, color: s <= r.rating ? '#FFD166' : '#E0E0E0' }}>★</Text>
                    ))}
                  </View>
                  <Text style={styles.reviewComment}>{r.comment}</Text>
                </View>
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={{ fontSize: 22 }}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>

        {/* Profile info */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 48 }}>👤</Text>
          </View>
          <Text style={styles.orgName}>{organizer.name}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{organizer.following}</Text>
              <Text style={styles.statLabel}>{t('profile.following')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{organizer.followers}</Text>
              <Text style={styles.statLabel}>{t('profile.followers')}</Text>
            </View>
          </View>

          {/* Follow + Message buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.followBtn, isFollowing && styles.followBtnActive]}
              onPress={() => setIsFollowing(!isFollowing)}>
              <Text style={{ fontSize: 14, marginRight: 6 }}>👥</Text>
              <Text style={[styles.followBtnText, isFollowing && { color: '#fff' }]}>
                {isFollowing ? 'Following' : t('common.follow')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.msgBtn}>
              <Text style={{ fontSize: 14, marginRight: 6 }}>💬</Text>
              <Text style={styles.msgBtnText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab content */}
        {renderTabContent()}
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
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  profileSection: { alignItems: 'center', paddingVertical: 16, paddingHorizontal: 24 },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  orgName: { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginBottom: 16 },

  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  statItem: { alignItems: 'center', paddingHorizontal: 32 },
  statVal: { fontSize: 20, fontWeight: '800', color: '#1A1A2E', marginBottom: 2 },
  statLabel: { fontSize: 12, color: '#999' },
  statDivider: { width: 1, height: 36, backgroundColor: '#E8E8F0' },

  actionRow: { flexDirection: 'row', gap: 12, width: '100%' },
  followBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#6C63FF', borderRadius: 12, paddingVertical: 12,
  },
  followBtnActive: { backgroundColor: '#6C63FF' },
  followBtnText: { fontSize: 14, fontWeight: '700', color: '#6C63FF' },
  msgBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#E8E8F0', borderRadius: 12, paddingVertical: 12,
  },
  msgBtnText: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },

  // Tabs
  tabBar: {
    flexDirection: 'row', borderBottomWidth: 1.5, borderBottomColor: '#F0F0F0',
    marginHorizontal: 24,
  },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 14, position: 'relative' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#999' },
  tabTextActive: { color: '#6C63FF' },
  tabIndicator: {
    position: 'absolute', bottom: -1.5, left: '15%', right: '15%',
    height: 3, backgroundColor: '#6C63FF', borderRadius: 2,
  },

  // Content
  tabContent: { paddingHorizontal: 24, paddingTop: 20 },
  bioText: { fontSize: 14, color: '#666', lineHeight: 24 },
  readMore: { color: '#6C63FF', fontWeight: '600' },

  eventRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', gap: 14 },
  eventThumb: { width: 64, height: 64, borderRadius: 14, backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center' },
  eventDate: { fontSize: 11, color: '#6C63FF', fontWeight: '600', marginBottom: 3 },
  eventTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', lineHeight: 18, marginBottom: 3 },
  eventLoc: { fontSize: 11, color: '#999', flex: 1 },

  reviewRow: { flexDirection: 'row', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', gap: 12 },
  reviewAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  reviewName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  reviewDate: { fontSize: 12, color: '#AAA' },
  reviewComment: { fontSize: 13, color: '#666', lineHeight: 20 },
});
