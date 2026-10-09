import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthBackground, BackButton, InputField, PrimaryBtn, C } from '../components/AuthComponents';

export default function ResetPasswordScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      <AuthBackground />

      <View style={[styles.inner, {
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 24,
      }]}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text style={styles.pageTitle}>Resset Password</Text>
        <Text style={styles.subtitle}>
          Please enter your email address to{'\n'}request a password reset
        </Text>

        <InputField
          icon="✉️"
          placeholder="abc@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <PrimaryBtn title="SEND" onPress={() => navigation.navigate('Verification')} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  inner: { flex: 1, paddingHorizontal: 28 },
  pageTitle: { fontSize: 26, fontWeight: '700', color: C.text, marginBottom: 10, marginTop: 16 },
  subtitle: { fontSize: 14, color: C.textGray, lineHeight: 22, marginBottom: 24 },
});
