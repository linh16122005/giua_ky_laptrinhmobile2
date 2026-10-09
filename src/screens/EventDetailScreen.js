import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, StatusBar, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius, fonts } from '../theme';

const { width, height } = Dimensions.get('window');

const TICKET_TYPES = [
  { id: '1', key: 'regular', multiplier: 1, perks: ['✓ General entrance', '✓ Standing area'] },
  { id: '2', key: 'vip', multiplier: 2.5, perks: ['✓ VIP entrance', '✓ Reserved seat', '✓ Gift'] },
  { id: '3', key: 'vvip', multiplier: 5, perks: ['✓ Meet artist', '✓ Backstage pass', '✓ All VIP perks'] },
];

export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params;
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [selectedTicket, setSelectedTicket] = useState(TICKET_TYPES[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  const ticketPrice = event.price === 0 ? 0 : event.price * selectedTicket.multiplier;
  const totalPrice = ticketPrice * quantity;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });

  const handleBook = () => {
    Alert.alert(
      '🎉 ' + (event.price === 0 ? t('event.registerFree') : t('event.bookNow')),
      `${quantity} ${t(`event.${selectedTicket.key}`)} — ${event.price === 0 ? t('common.free') : `${(totalPrice / 1000).toFixed(0)}K ₫`}`,
      [{ text: t('common.ok'), onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero image area */}
      <View style={styles.heroContainer}>
        <View style={styles.heroImg}>
          <Text style={styles.heroEmoji}>🎵</Text>
          {/* Dark overlay gradient */}
          <View style={styles.heroOverlay} />
        </View>

        {/* Header buttons */}
        <View style={[styles.heroHeader, { top: insets.top + 10 }]}>
          <TouchableOpacity style={styles.heroBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.heroBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.heroHeaderTitle}>{t('event.eventDetails')}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => navigation.navigate('Share', { eventTitle: event.title })}>
              <Text style={styles.heroBtnText}>↗</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroBtn} onPress={() => setIsSaved(!isSaved)}>
              <Text style={styles.heroBtnText}>{isSaved ? '🔖' : '📑'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* White card body */}
      <View style={styles.body}>
        {/* Going row */}
        <View style={styles.goingRow}>
          <View style={styles.avatarGroup}>
            {['👤','👤','👤'].map((a,i) => (
              <View key={i} style={[styles.avatar, { marginLeft: i > 0 ? -10 : 0 }]}>
                <Text style={{ fontSize: 12 }}>{a}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.goingText}>+20 {t('common.going')}</Text>
          <TouchableOpacity
            style={styles.inviteBtn}
            onPress={() => navigation.navigate('InviteFriend')}>
            <Text style={styles.inviteBtnText}>{t('common.invite')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}>

          {/* Title */}
          <Text style={styles.eventTitle}>{event.title}</Text>

          {/* Info rows */}
          <View style={styles.infoBlock}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}><Text style={{ fontSize: 18 }}>📅</Text></View>
              <View>
                <Text style={styles.infoMain}>{formatDate(event.date)}</Text>
                <Text style={styles.infoSub}>
                  {new Date(event.date).toLocaleDateString('en', { weekday: 'long' })}, {event.time}
                </Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}><Text style={{ fontSize: 18 }}>📍</Text></View>
              <View>
                <Text style={styles.infoMain}>{event.location.split(',')[0]}</Text>
                <Text style={styles.infoSub}>{event.location}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => navigation.navigate('OrganizerProfile', { organizer: event.organizer })}>
              <View style={styles.infoIcon}><Text style={{ fontSize: 20 }}>👤</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoMain}>{event.organizer}</Text>
                <Text style={styles.infoSub}>{t('event.organizer')}</Text>
              </View>
              <TouchableOpacity
                style={styles.followBtn}
                onPress={() => navigation.navigate('OrganizerProfile', { organizer: event.organizer })}>
                <Text style={styles.followBtnText}>{t('common.follow')}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('event.aboutEvent')}</Text>
            <Text style={styles.aboutText}>{event.description}</Text>
          </View>

          {/* Ticket types */}
          {event.price > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('event.ticketType')}</Text>
              {TICKET_TYPES.map(ticket => (
                <TouchableOpacity
                  key={ticket.id}
                  style={[styles.ticketCard, selectedTicket.id === ticket.id && styles.ticketCardActive]}
                  onPress={() => setSelectedTicket(ticket)}>
                  <View style={[styles.ticketRadio, selectedTicket.id === ticket.id && styles.ticketRadioActive]}>
                    {selectedTicket.id === ticket.id && <View style={styles.ticketRadioDot} />}
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.ticketName}>{t(`event.${ticket.key}`)}</Text>
                    {ticket.perks.map((p, i) => (
                      <Text key={i} style={styles.ticketPerk}>{p}</Text>
                    ))}
                  </View>
                  <Text style={styles.ticketPrice}>
                    {((event.price * ticket.multiplier) / 1000).toFixed(0)}K
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Quantity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('event.quantity')}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyVal}>{quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(Math.min(10, quantity + 1))} disabled={quantity >= 10}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNote}>{t('event.maxTickets')}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Buy ticket bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity style={styles.buyBtn} onPress={handleBook} activeOpacity={0.85}>
          <Text style={styles.buyBtnText}>
            {event.price === 0
              ? t('event.registerFree').toUpperCase()
              : `${t('event.buyTicket')} $${(totalPrice / 25000).toFixed(0)}`}
          </Text>
          <View style={styles.buyBtnArrow}>
            <Text style={{ color: '#6C63FF', fontWeight: '800', fontSize: 16 }}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Hero
  heroContainer: { height: height * 0.32 },
  heroImg: { flex: 1, backgroundColor: '#2D1B69', alignItems: 'center', justifyContent: 'center' },
  heroEmoji: { fontSize: 72 },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: 'rgba(0,0,0,0.2)' },
  heroHeader: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  heroBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  heroBtnText: { fontSize: 18, color: '#fff', fontWeight: '700' },
  heroHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },

  // Body
  body: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -24, paddingHorizontal: 20, paddingTop: 16 },
  goingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatarGroup: { flexDirection: 'row', marginRight: 8 },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E0DFFF', borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  goingText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#6C63FF' },
  inviteBtn: { backgroundColor: '#6C63FF', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 6 },
  inviteBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },

  eventTitle: { fontSize: 26, fontWeight: '800', color: '#1A1A2E', lineHeight: 34, marginBottom: 20 },

  // Info block
  infoBlock: { marginBottom: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  infoIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0EFFF', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  infoMain: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  infoSub: { fontSize: 12, color: '#999', marginTop: 2 },
  followBtn: { borderWidth: 1.5, borderColor: '#6C63FF', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 5 },
  followBtnText: { fontSize: 12, color: '#6C63FF', fontWeight: '600' },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  aboutText: { fontSize: 14, color: '#666', lineHeight: 22 },

  // Tickets
  ticketCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#E8E8F0', borderRadius: 12, padding: 14, marginBottom: 10 },
  ticketCardActive: { borderColor: '#6C63FF', backgroundColor: '#F0EFFF' },
  ticketRadio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CCC', alignItems: 'center', justifyContent: 'center' },
  ticketRadioActive: { borderColor: '#6C63FF' },
  ticketRadioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#6C63FF' },
  ticketName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  ticketPerk: { fontSize: 11, color: '#06D6A0', marginBottom: 2 },
  ticketPrice: { fontSize: 18, fontWeight: '800', color: '#6C63FF' },

  // Quantity
  qtyBtn: { width: 36, height: 36, borderRadius: 10, borderWidth: 1, borderColor: '#E8E8F0', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8FC' },
  qtyBtnText: { fontSize: 20, color: '#333', fontWeight: '700', lineHeight: 24 },
  qtyVal: { fontSize: 22, fontWeight: '800', color: '#1A1A2E', width: 44, textAlign: 'center' },
  qtyNote: { fontSize: 11, color: '#999', marginLeft: 8 },

  // Bottom bar
  bottomBar: { paddingHorizontal: 20, paddingTop: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  buyBtn: { backgroundColor: '#6C63FF', borderRadius: 16, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  buyBtnText: { fontSize: 15, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  buyBtnArrow: { position: 'absolute', right: 16, width: 32, height: 32, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
});
