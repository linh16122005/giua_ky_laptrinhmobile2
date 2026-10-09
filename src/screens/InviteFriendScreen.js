import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, TextInput, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const FRIENDS = [
  { id: '1',  name: 'Alex Lee',         followers: '2k',   emoji: '👤' },
  { id: '2',  name: 'Micheal Ulasi',    followers: '56',   emoji: '👤' },
  { id: '3',  name: 'Cristofer',        followers: '300',  emoji: '👤' },
  { id: '4',  name: 'David Silbia',     followers: '5k',   emoji: '👤' },
  { id: '5',  name: 'Ashfak Sayem',     followers: '402',  emoji: '👤' },
  { id: '6',  name: 'Rocks Velkeinjen', followers: '893',  emoji: '👤' },
  { id: '7',  name: 'Roman Kutepov',    followers: '225',  emoji: '👤' },
  { id: '8',  name: 'Cristofer Nolan',  followers: '322',  emoji: '👤' },
  { id: '9',  name: 'Zenifero Bolex',   followers: '3k',   emoji: '👤' },
  { id: '10', name: 'Allie Hop',        followers: '1.2k', emoji: '👤' },
];

const AVATAR_COLORS = [
  '#FFD166', '#FF6B6B', '#6C63FF', '#06D6A0', '#FF9F43',
  '#A29BFE', '#74B9FF', '#FD79A8', '#55EFC4', '#FDCB6E',
];

export default function InviteFriendScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  // Pre-select some friends to match the design
  const [selected, setSelected] = useState(['1', '3', '5', '6']);

  const filtered = FRIENDS.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderFriend = ({ item, index }) => {
    const isSelected = selected.includes(item.id);
    return (
      <TouchableOpacity
        style={styles.friendRow}
        onPress={() => toggleSelect(item.id)}
        activeOpacity={0.75}>
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }]}>
          <Text style={{ fontSize: 22 }}>👤</Text>
        </View>
        {/* Info */}
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendFollowers}>{item.followers} Folowers</Text>
        </View>
        {/* Checkbox */}
        <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
          {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.overlay}>
      <StatusBar barStyle="dark-content" />

      {/* Dim backdrop */}
      <View style={styles.backdrop} />

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        {/* Handle */}
        <View style={styles.handle} />

        <Text style={styles.title}>Invite Friend</Text>

        {/* Search */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#CCC"
            value={query}
            onChangeText={setQuery}
          />
          <Text style={{ fontSize: 18, color: '#6C63FF' }}>🔍</Text>
        </View>

        {/* Friends list */}
        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          renderItem={renderFriend}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />

        {/* Invite button */}
        <TouchableOpacity
          style={styles.inviteBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}>
          <Text style={styles.inviteBtnText}>INVITE</Text>
          <View style={styles.inviteBtnArrow}>
            <Text style={{ color: '#6C63FF', fontSize: 18, fontWeight: '700' }}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: 24, paddingTop: 12,
    maxHeight: '90%',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: '#E0E0E0', alignSelf: 'center', marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginBottom: 16 },

  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#F0F0F0', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10,
    marginBottom: 16, backgroundColor: '#FAFAFA',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },

  list: { maxHeight: 380 },

  friendRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F8F8F8',
  },
  avatar: {
    width: 46, height: 46, borderRadius: 23,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 14, opacity: 0.9,
  },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 2 },
  friendFollowers: { fontSize: 12, color: '#999' },

  checkbox: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 2, borderColor: '#E0E0E0',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  checkmark: { fontSize: 14, color: '#fff', fontWeight: '800' },

  inviteBtn: {
    backgroundColor: '#6C63FF', borderRadius: 16,
    paddingVertical: 16, marginTop: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  inviteBtnText: { fontSize: 15, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  inviteBtnArrow: {
    position: 'absolute', right: 16,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
});
