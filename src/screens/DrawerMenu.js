import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { changeLanguage, getCurrentLanguage } from '../i18n';

const { width } = Dimensions.get('window');

const MENU_ITEMS = [
  { key: 'myProfile',  icon: '👤' },
  { key: 'message',   icon: '💬' },
  { key: 'calendar',  icon: '📅' },
  { key: 'bookmark',  icon: '🔖' },
  { key: 'contactUs', icon: '✉️' },
  { key: 'settings',  icon: '⚙️' },
  { key: 'helpsFaqs', icon: '❓' },
];

export default function DrawerMenu({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());
  const [showLangPicker, setShowLangPicker] = useState(false);

  const handleLang = async (lang) => {
    await changeLanguage(lang);
    setCurrentLang(lang);
    setShowLangPicker(false);
  };

  const handleSignOut = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile area */}
        <View style={styles.profileArea}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 36 }}>👤</Text>
          </View>
          <Text style={styles.userName}>Ashfak Sayem</Text>
          <Text style={styles.userEmail}>ashfak@eventhub.com</Text>
        </View>

        {/* Menu items */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map(item => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuItem}
              onPress={() => {
                if (item.key === 'settings') setShowLangPicker(!showLangPicker);
              }}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{t(`menu.${item.key}`)}</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}

          {/* Language picker inline */}
          {showLangPicker && (
            <View style={styles.langPicker}>
              <Text style={styles.langPickerTitle}>{t('settings.chooseLanguage')}</Text>
              {[
                { code: 'vi', label: '🇻🇳  ' + t('settings.vietnamese') },
                { code: 'en', label: '🇺🇸  ' + t('settings.english') },
              ].map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={[styles.langOption, currentLang === lang.code && styles.langOptionActive]}
                  onPress={() => handleLang(lang.code)}>
                  <Text style={[styles.langOptionText, currentLang === lang.code && styles.langOptionTextActive]}>
                    {lang.label}
                  </Text>
                  {currentLang === lang.code && <Text style={{ color: '#6C63FF' }}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Sign out */}
          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <Text style={styles.menuIcon}>🚪</Text>
            <Text style={[styles.menuLabel, { color: '#FF6B6B' }]}>{t('auth.signOut')}</Text>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Upgrade Pro button */}
      <TouchableOpacity style={[styles.upgradePro, { marginBottom: insets.bottom + 20 }]}>
        <Text style={styles.upgradeIcon}>👑</Text>
        <Text style={styles.upgradeText}>{t('menu.upgradePro')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 },

  profileArea: { alignItems: 'flex-start', paddingVertical: 28 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  userName: { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  userEmail: { fontSize: 13, color: '#999' },

  menuList: { borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 8 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F8F8F8',
  },
  menuIcon: { fontSize: 20, width: 36 },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: '#1A1A2E' },
  menuChevron: { fontSize: 20, color: '#CCC' },

  // Language picker
  langPicker: {
    backgroundColor: '#F8F8FC', borderRadius: 14,
    padding: 14, marginBottom: 8,
  },
  langPickerTitle: { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 10 },
  langOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10, paddingHorizontal: 12,
    borderRadius: 10, marginBottom: 6,
    backgroundColor: '#fff',
    borderWidth: 1.5, borderColor: '#E8E8F0',
  },
  langOptionActive: { borderColor: '#6C63FF', backgroundColor: '#F0EFFF' },
  langOptionText: { fontSize: 14, color: '#333' },
  langOptionTextActive: { color: '#6C63FF', fontWeight: '600' },

  // Upgrade
  upgradePro: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#E8F4FD', borderRadius: 16,
    paddingVertical: 14, gap: 8,
  },
  upgradeIcon: { fontSize: 20 },
  upgradeText: { fontSize: 15, fontWeight: '700', color: '#6C63FF' },
});
