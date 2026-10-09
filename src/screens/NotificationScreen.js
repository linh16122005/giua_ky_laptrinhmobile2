import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const NOTIFICATIONS = [
  { id: '1',  type: 'invite',  avatar: '👤', name: 'David Silbia',    msg: 'Invite Jo Malone London\'s Mother\'s',  time: 'Just now',   needsAction: true },
  { id: '2',  type: 'follow',  avatar: '👤', name: 'Adnan Safi',      msg: 'Started following you',                 time: '5 min ago',  needsAction: false },
  { id: '3',  type: 'invite',  avatar: '👤', name: 'Joan Baker',      msg: 'Invite A virtual Evening of Smooth Jazz', time: '20 min ago', needsAction: true },
  { id: '4',  type: 'like',    avatar: '👤', name: 'Ronald C. Kinch', msg: 'Like you events',                       time: '1 hr ago',   needsAction: false },
  { id: '5',  type: 'join',    avatar: '👤', name: 'Clara Tolson',    msg: 'Join your Event Gala Music Festival',   time: '9 hr ago',   needsAction: false },
  { id: '6',  type: 'invite',  avatar: '👤', name: 'Jennifer Fritz',  msg: 'Invite you International Kids Safe',    time: 'Tue, 5:10 pm', needsAction: true },
  { id: '7',  type: 'follow',  avatar: '👤', name: 'Eric G. Prickett', msg: 'Started following you',               time: 'Wed, 3:30 pm', needsAction: false },
];

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyNotification() {
  return (
    <View style={styles.emptyWrap}>
      {/* Robot/envelope illustration */}
      <View style={styles.illustrationWrap}>
        <View style={styles.envBox}>
          {/* Envelope */}
          <View style={styles.envelope}>
            <View style={styles.envelopeFlap} />
            <Text style={styles.envelopeFace}>🙂</Text>
          </View>
          {/* Badge 0 */}
          <View style={styles.zeroBadge}>
            <Text style={styles.zeroBadgeText}>0</Text>
          </View>
        </View>
      </View>
      <Text style={styles.emptyTitle}>No Notifications!</Text>
      <Text style={styles.emptySubtitle}>
        Lorem ipsum dolor sit amet, consectetur{'\n'}adipiscing elit sed do eiusmod tempor
      </Text>
    </View>
  );
}

// ─── Notification item ────────────────────────────────────────────────────────
function NotifItem({ item, onAccept, onReject }) {
  const [responded, setResponded] = useState(false);

  return (
    <View style={styles.notifRow}>
      <View style={styles.notifAvatar}>
        <Text style={{ fontSize: 22 }}>👤</Text>
      </View>
      <View style={styles.notifBody}>
        <View style={styles.notifTopRow}>
          <Text style={styles.notifName}>{item.name} </Text>
          <Text style={styles.notifMsg} numberOfLines={2}>
            <Text style={styles.notifMsgText}>{item.msg}</Text>
          </Text>
        </View>
        <Text style={styles.notifTime}>{item.time}</Text>
        {item.needsAction && !responded && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.rejectBtn}
              onPress={() => { onReject?.(); setResponded(true); }}>
              <Text style={styles.rejectBtnText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => { onAccept?.(); setResponded(true); }}>
              <Text style={styles.acceptBtnText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.needsAction && responded && (
          <Text style={styles.respondedText}>✓ Responded</Text>
        )}
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function NotificationScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState('list'); // 'empty' | 'list'
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={{ fontSize: 22 }}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Dev toggle — empty/list (remove in production) */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
        <TouchableOpacity onPress={() => setMode('empty')}><Text>Empty</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('list')}><Text>List</Text></TouchableOpacity>
      </View> */}

      {notifications.length === 0 || mode === 'empty' ? (
        <EmptyNotification />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <NotifItem
              item={item}
              onAccept={() => {}}
              onReject={() => setNotifications(prev => prev.filter(n => n.id !== item.id))}
            />
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

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingBottom: 14,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center' },
  backArrow: { fontSize: 22, fontWeight: '600', color: '#1A1A2E' },
  headerTitle: { flex: 1, fontSize: 22, fontWeight: '700', color: '#1A1A2E' },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  // Empty
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  illustrationWrap: { marginBottom: 32, position: 'relative' },
  envBox: { position: 'relative' },
  envelope: {
    width: 120, height: 90, backgroundColor: '#F0F0F0',
    borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  envelopeFlap: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 44, backgroundColor: '#E0E0E0',
    borderTopLeftRadius: 12, borderTopRightRadius: 12,
  },
  envelopeFace: { fontSize: 28, zIndex: 1 },
  zeroBadge: {
    position: 'absolute', bottom: -10, right: -10,
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#6C63FF', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2.5, borderColor: '#fff',
  },
  zeroBadgeText: { fontSize: 13, fontWeight: '800', color: '#fff' },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginBottom: 12, textAlign: 'center' },
  emptySubtitle: { fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 22 },

  // Notification list
  list: { paddingHorizontal: 20 },
  notifRow: {
    flexDirection: 'row', paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  notifAvatar: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center',
    marginRight: 12, flexShrink: 0,
  },
  notifBody: { flex: 1 },
  notifTopRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 3 },
  notifName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  notifMsg: { flex: 1 },
  notifMsgText: { fontSize: 14, color: '#666' },
  notifTime: { fontSize: 11, color: '#AAA', marginBottom: 8 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  rejectBtn: {
    paddingHorizontal: 20, paddingVertical: 8,
    borderRadius: 10, borderWidth: 1.5, borderColor: '#E8E8F0',
  },
  rejectBtnText: { fontSize: 13, fontWeight: '600', color: '#999' },
  acceptBtn: {
    paddingHorizontal: 24, paddingVertical: 8,
    borderRadius: 10, backgroundColor: '#6C63FF',
  },
  acceptBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  respondedText: { fontSize: 12, color: '#06D6A0', fontWeight: '600' },
});
