import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  StatusBar, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthBackground, BackButton, PrimaryBtn, C } from '../components/AuthComponents';

export default function VerificationScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState(['4', '4', '', '']);
  const [countdown, setCountdown] = useState(20);
  const inputs = useRef([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleDigit = (val, idx) => {
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);
    if (val && idx < 3) inputs.current[idx + 1]?.focus();
    if (!val && idx > 0) inputs.current[idx - 1]?.focus();
  };

  const activeIndex = code.findIndex(d => !d);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      <AuthBackground />

      <View style={[styles.inner, {
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 24,
      }]}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text style={styles.pageTitle}>Verification</Text>
        <Text style={styles.subtitle}>
          We've send you the verification{'\n'}code on +1 2620 0323 7631
        </Text>

        {/* OTP input boxes */}
        <View style={styles.otpRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={r => (inputs.current[idx] = r)}
              style={[
                styles.otpBox,
                digit ? styles.otpBoxFilled : {},
                idx === activeIndex ? styles.otpBoxActive : {},
              ]}
              value={digit}
              onChangeText={val => handleDigit(val.slice(-1), idx)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <PrimaryBtn title="CONTINUE" onPress={() => navigation.replace('MainTabs')} />

        {/* Resend countdown */}
        <View style={styles.resendRow}>
          <Text style={styles.resendGray}>Re-send code in </Text>
          {countdown > 0 ? (
            <Text style={styles.resendTimer}>
              0:{countdown.toString().padStart(2, '0')}
            </Text>
          ) : (
            <TouchableOpacity onPress={() => setCountdown(20)}>
              <Text style={styles.resendBlue}>Resend</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  inner: { flex: 1, paddingHorizontal: 28 },
  pageTitle: { fontSize: 26, fontWeight: '700', color: C.text, marginBottom: 10, marginTop: 16 },
  subtitle: { fontSize: 14, color: C.textGray, lineHeight: 22, marginBottom: 32 },
  otpRow: {
    flexDirection: 'row', gap: 14,
    marginBottom: 32, justifyContent: 'center',
  },
  otpBox: {
    width: 60, height: 60, borderRadius: 12,
    borderWidth: 1.5, borderColor: C.border,
    backgroundColor: C.white,
    fontSize: 24, fontWeight: '700', color: C.text,
    textAlign: 'center',
  },
  otpBoxFilled: { borderColor: C.text },
  otpBoxActive: { borderColor: C.primary, borderWidth: 2 },
  resendRow: {
    flexDirection: 'row', justifyContent: 'center',
    marginTop: 18, alignItems: 'center',
  },
  resendGray: { fontSize: 13, color: C.textGray },
  resendTimer: { fontSize: 13, color: C.primary, fontWeight: '600' },
  resendBlue: { fontSize: 13, color: C.primary, fontWeight: '600' },
});
