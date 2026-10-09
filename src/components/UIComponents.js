import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { colors, spacing, radius, fonts } from '../theme';

const { width } = Dimensions.get('window');

// Simple star rating component
export function StarRating({ rating, size = 14 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {stars.map((star) => (
        <Text
          key={star}
          style={{ fontSize: size, color: star <= Math.round(rating) ? '#FFD166' : '#3A3A5A' }}>
          ★
        </Text>
      ))}
    </View>
  );
}

// Category chip
export function CategoryChip({ category, isSelected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        isSelected && { backgroundColor: colors.primary, borderColor: colors.primary },
      ]}>
      <Text style={styles.chipIcon}>{category.icon}</Text>
      <Text style={[styles.chipText, isSelected && { color: colors.text }]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

// Price tag
export function PriceTag({ price, style }) {
  return (
    <View style={[styles.priceTag, style]}>
      <Text style={styles.priceText}>
        {price === 0 ? 'Miễn phí' : `${(price / 1000).toFixed(0)}K`}
      </Text>
    </View>
  );
}

// Badge component
export function Badge({ label, color = colors.primary }) {
  return (
    <View style={[styles.badge, { backgroundColor: color + '30', borderColor: color + '60' }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

// Section header
export function SectionHeader({ title, onSeeAll }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>Xem tất cả →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Info row with icon
export function InfoRow({ icon, text, textStyle }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={[styles.infoText, textStyle]} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}

// Primary button
export function PrimaryButton({ title, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.primaryBtn, disabled && { opacity: 0.5 }, style]}>
      <Text style={styles.primaryBtnText}>{title}</Text>
    </TouchableOpacity>
  );
}

// Attendee count
export function AttendeeCount({ count }) {
  return (
    <View style={styles.attendeeRow}>
      <Text style={styles.attendeeIcon}>👥</Text>
      <Text style={styles.attendeeText}>{count.toLocaleString('vi-VN')} người tham dự</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  chipText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  priceTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
  priceText: {
    color: colors.text,
    fontSize: fonts.sizes.sm,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: fonts.sizes.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  infoText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: colors.text,
    fontSize: fonts.sizes.lg,
    fontWeight: '700',
  },
  attendeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  attendeeText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
  },
});
