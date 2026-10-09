import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Share, Linking, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SHARE_OPTIONS = [
  {
    id: 'copylink', label: 'Copy Link',
    bg: '#F5F5FA', icon: '🔗',
    onPress: () => { /* Copy to clipboard */ },
  },
  {
    id: 'whatsapp', label: 'WhatsApp',
    bg: '#25D366', icon: '💬',
    onPress: (url) => Linking.openURL(`whatsapp://send?text=${encodeURIComponent(url)}`),
  },
  {
    id: 'facebook', label: 'Facebook',
    bg: '#1877F2', icon: '📘',
    onPress: (url) => Linking.openURL(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`),
  },
  {
    id: 'messenger', label: 'Messenger',
    bg: '#0099FF', icon: '💙',
    onPress: () => Linking.openURL('fb-messenger://'),
  },
  {
    id: 'twitter', label: 'Twitter',
    bg: '#1DA1F2', icon: '🐦',
    onPress: (url) => Linking.openURL(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`),
  },
  {
    id: 'instagram', label: 'Instagram',
    bg: '#E1306C', icon: '📸',
    onPress: () => Linking.openURL('instagram://'),
  },
  {
    id: 'skype', label: 'Skype',
    bg: '#00AFF0', icon: '🔵',
    onPress: () => Linking.openURL('skype:'),
  },
  {
    id: 'message', label: 'Massage',
    bg: '#34C759', icon: '💬',
    onPress: (url) => Linking.openURL(`sms:?body=${encodeURIComponent(url)}`),
  },
];

export default function ShareScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const eventTitle = route?.params?.eventTitle || 'International Band Music Concert';
  const shareUrl   = route?.params?.shareUrl   || 'https://eventhub.app/event/1';

  const handleNativeShare = async () => {
    try {
      await Share.share({ title: eventTitle, message: `${eventTitle}\n${shareUrl}` });
    } catch {}
  };

  return (
    <View style={styles.overlay}>
      <StatusBar barStyle="light-content" />

      {/* Backdrop tap to close */}
      <TouchableOpacity style={styles.backdrop} onPress={() => navigation.goBack()} />

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        {/* Handle */}
        <View style={styles.handle} />

        <Text style={styles.title}>Share with friends</Text>

        {/* 4-column grid */}
        <View style={styles.grid}>
          {SHARE_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.gridItem}
              onPress={() => opt.onPress(shareUrl)}
              activeOpacity={0.75}>
              <View style={[styles.iconWrap, { backgroundColor: opt.bg }]}>
                <Text style={styles.iconEmoji}>{opt.icon}</Text>
              </View>
              <Text style={styles.iconLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cancel button */}
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}>
          <Text style={styles.cancelBtnText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: 24, paddingTop: 12,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: '#E0E0E0', alignSelf: 'center', marginBottom: 20,
  },
  title: {
    fontSize: 18, fontWeight: '700', color: '#1A1A2E',
    textAlign: 'center', marginBottom: 24,
  },

  // Icon grid — 4 per row
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  gridItem: {
    width: '22%', alignItems: 'center', marginBottom: 20,
  },
  iconWrap: {
    width: 56, height: 56, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  iconEmoji: { fontSize: 26 },
  iconLabel: { fontSize: 11, color: '#666', textAlign: 'center', fontWeight: '500' },

  // Cancel
  cancelBtn: {
    borderTopWidth: 1, borderTopColor: '#F0F0F0',
    paddingTop: 16, alignItems: 'center',
  },
  cancelBtnText: { fontSize: 14, fontWeight: '700', color: '#666', letterSpacing: 1 },
});
