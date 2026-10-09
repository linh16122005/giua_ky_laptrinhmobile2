import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';

export const C = {
  primary: '#4F56F5',
  text: '#1A1A2E',
  textGray: '#9B9BAD',
  border: '#E8E8F0',
  bg: '#F5F5FA',
  white: '#FFFFFF',
};

// ─── Background blobs ────────────────────────────────────────────────────────
export function AuthBackground() {
  return (
    <>
      <View style={s.blobTL} />
      <View style={s.blobBR} />
    </>
  );
}

// ─── EventHub logo mark ──────────────────────────────────────────────────────
export function LogoMark({ size = 56 }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        position: 'absolute',
        width: size, height: size, borderRadius: size / 2,
        borderWidth: size * 0.11, borderColor: '#2B9FFF',
        borderTopColor: 'transparent',
        transform: [{ rotate: '-45deg' }],
      }} />
      <View style={{
        position: 'absolute',
        width: size * 0.55, height: size * 0.55, borderRadius: size * 0.275,
        borderWidth: size * 0.11, borderColor: '#5B4EFF',
        borderTopColor: 'transparent',
        transform: [{ rotate: '135deg' }],
      }} />
    </View>
  );
}

// ─── Input field ─────────────────────────────────────────────────────────────
export function InputField({
  icon, placeholder, value, onChangeText,
  secureTextEntry, keyboardType, rightIcon, onRightIconPress,
}) {
  return (
    <View style={s.inputWrap}>
      <Text style={s.inputIcon}>{icon}</Text>
      <TextInput
        style={s.input}
        placeholder={placeholder}
        placeholderTextColor={C.textGray}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType || 'default'}
        autoCapitalize="none"
      />
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress}>
          <Text style={{ fontSize: 18, color: C.textGray }}>{rightIcon}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── Primary button ──────────────────────────────────────────────────────────
export function PrimaryBtn({ title, onPress }) {
  return (
    <TouchableOpacity style={s.btn} onPress={onPress} activeOpacity={0.85}>
      <Text style={s.btnText}>{title}</Text>
      <View style={s.btnArrow}>
        <Text style={{ color: C.primary, fontSize: 18, fontWeight: '700' }}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Social login buttons ─────────────────────────────────────────────────────
export function SocialButtons() {
  return (
    <>
      <View style={s.orRow}>
        <View style={s.orLine} />
        <Text style={s.orText}>OR</Text>
        <View style={s.orLine} />
      </View>
      <TouchableOpacity style={s.socialBtn} activeOpacity={0.8}>
        <Text style={s.googleG}>G</Text>
        <Text style={s.socialBtnText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[s.socialBtn, { marginTop: 10 }]} activeOpacity={0.8}>
        <View style={s.fbIcon}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>f</Text>
        </View>
        <Text style={s.socialBtnText}>Login with Facebook</Text>
      </TouchableOpacity>
    </>
  );
}

// ─── Back button ─────────────────────────────────────────────────────────────
export function BackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.backBtn}>
      <Text style={s.backArrow}>←</Text>
    </TouchableOpacity>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  blobTL: {
    position: 'absolute', top: -100, left: -100,
    width: 280, height: 280, borderRadius: 140,
    backgroundColor: 'rgba(180,170,255,0.18)',
  },
  blobBR: {
    position: 'absolute', bottom: -100, right: -100,
    width: 280, height: 280, borderRadius: 140,
    backgroundColor: 'rgba(150,200,255,0.14)',
  },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E8E8F0',
    paddingHorizontal: 14, paddingVertical: 14,
    marginBottom: 14,
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#1A1A2E', padding: 0 },
  btn: {
    backgroundColor: '#4F56F5', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 16,
    marginBottom: 6, position: 'relative',
  },
  btnText: { fontSize: 15, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  btnArrow: {
    position: 'absolute', right: 16,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 18, gap: 12 },
  orLine: { flex: 1, height: 1, backgroundColor: '#E8E8F0' },
  orText: { fontSize: 12, color: '#9B9BAD', fontWeight: '600' },
  socialBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E8E8F0',
    paddingVertical: 14, paddingHorizontal: 20, gap: 12,
  },
  socialBtnText: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  googleG: {
    width: 26, height: 26, borderRadius: 13,
    textAlign: 'center', lineHeight: 26,
    fontSize: 15, fontWeight: '800', color: '#EA4335',
    backgroundColor: '#FFF5F5', overflow: 'hidden',
  },
  fbIcon: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#1877F2', alignItems: 'center', justifyContent: 'center',
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center' },
  backArrow: { fontSize: 22, color: '#1A1A2E', fontWeight: '600' },
});
