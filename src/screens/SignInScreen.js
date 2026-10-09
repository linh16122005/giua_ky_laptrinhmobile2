import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Switch,
  KeyboardAvoidingView, Platform, ScrollView, StatusBar,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthBackground, LogoMark, InputField, PrimaryBtn, SocialButtons, C } from '../components/AuthComponents';

export default function SignInScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      <AuthBackground />

      <ScrollView
        contentContainerStyle={[styles.scroll, {
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
        }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <View style={styles.logoArea}>
          <LogoMark size={64} />
          <Text style={styles.logoText}>EventHub</Text>
        </View>

        <Text style={styles.pageTitle}>Sign in</Text>

        <InputField
          icon="✉️"
          placeholder="abc@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <InputField
          icon="🔒"
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPass}
          rightIcon={showPass ? '👁' : '🙈'}
          onRightIconPress={() => setShowPass(!showPass)}
        />

        {/* Remember Me + Forgot Password */}
        <View style={styles.rememberRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Switch
              value={remember}
              onValueChange={setRemember}
              trackColor={{ false: C.border, true: C.primary }}
              thumbColor={C.white}
              style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
            />
            <Text style={styles.rememberText}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <PrimaryBtn title="SIGN IN" onPress={() => navigation.replace('MainTabs')} />

        <SocialButtons />

        <View style={styles.bottomLink}>
          <Text style={styles.bottomGray}>Don't have an account?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.bottomBlue}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 28 },
  logoArea: { alignItems: 'center', marginBottom: 24 },
  logoText: {
    fontSize: 26, fontWeight: '700', color: C.text,
    marginTop: 8, letterSpacing: -0.5,
  },
  pageTitle: { fontSize: 26, fontWeight: '700', color: C.text, marginBottom: 22 },
  rememberRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 22, marginTop: 4,
  },
  rememberText: { fontSize: 13, color: C.text, fontWeight: '500' },
  forgotText: { fontSize: 13, color: C.textGray },
  bottomLink: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  bottomGray: { fontSize: 13, color: C.textGray },
  bottomBlue: { fontSize: 13, color: C.primary, fontWeight: '600' },
});
