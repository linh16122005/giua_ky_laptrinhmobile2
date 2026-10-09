import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Switch, KeyboardAvoidingView,
  Platform, ScrollView, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Shared design tokens ────────────────────────────────────────────────────
const C = {
  primary: '#4F56F5',
  primaryLight: '#6B72FF',
  text: '#1A1A2E',
  textGray: '#9B9BAD',
  border: '#E8E8F0',
  bg: '#F5F5FA',
  white: '#FFFFFF',
};

// ─── EventHub Logo mark ──────────────────────────────────────────────────────
function LogoMark({ size = 56 }) {
  const s = size;
  return (
    <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        width: s, height: s, borderRadius: s / 2,
        borderWidth: s * 0.11, borderColor: '#2B9FFF',
        borderTopColor: 'transparent',
        transform: [{ rotate: '-45deg' }],
        position: 'absolute',
      }} />
      <View style={{
        width: s * 0.55, height: s * 0.55, borderRadius: s * 0.275,
        borderWidth: s * 0.11, borderColor: '#5B4EFF',
        borderTopColor: 'transparent',
        transform: [{ rotate: '135deg' }],
        position: 'absolute',
      }} />
    </View>
  );
}

// ─── Shared input field ──────────────────────────────────────────────────────
function InputField({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, rightIcon, onRightIconPress }) {
  return (
    <View style={shared.inputWrap}>
      <Text style={shared.inputIcon}>{icon}</Text>
      <TextInput
        style={shared.input}
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
function PrimaryBtn({ title, onPress }) {
  return (
    <TouchableOpacity style={shared.btn} onPress={onPress} activeOpacity={0.85}>
      <Text style={shared.btnText}>{title}</Text>
      <View style={shared.btnArrow}>
        <Text style={{ color: C.primary, fontSize: 18, fontWeight: '700' }}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Social buttons ──────────────────────────────────────────────────────────
function SocialButtons() {
  return (
    <>
      <View style={shared.orRow}>
        <View style={shared.orLine} />
        <Text style={shared.orText}>OR</Text>
        <View style={shared.orLine} />
      </View>
      <TouchableOpacity style={shared.socialBtn} activeOpacity={0.8}>
        <Text style={shared.googleG}>G</Text>
        <Text style={shared.socialBtnText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[shared.socialBtn, { marginTop: 10 }]} activeOpacity={0.8}>
        <View style={shared.fbIcon}><Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>f</Text></View>
        <Text style={shared.socialBtnText}>Login with Facebook</Text>
      </TouchableOpacity>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SIGN IN SCREEN
// ════════════════════════════════════════════════════════════════════════════
export function SignInScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      {/* Blobs */}
      <View style={styles.blobTL} /><View style={styles.blobBR} />

      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}
        keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <View style={styles.logoArea}>
          <LogoMark size={64} />
          <Text style={styles.logoText}>EventHub</Text>
        </View>

        <Text style={styles.pageTitle}>Sign in</Text>

        <InputField icon="✉️" placeholder="abc@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <InputField icon="🔒" placeholder="Your password" value={password} onChangeText={setPassword}
          secureTextEntry={!showPass} rightIcon={showPass ? '👁' : '🙈'} onRightIconPress={() => setShowPass(!showPass)} />

        {/* Remember / Forgot */}
        <View style={styles.rememberRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Switch value={remember} onValueChange={setRemember}
              trackColor={{ false: C.border, true: C.primary }}
              thumbColor={C.white} style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }} />
            <Text style={styles.rememberText}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <PrimaryBtn title="SIGN IN" onPress={() => navigation.replace('MainTabs')} />

        <SocialButtons />

        <View style={styles.bottomLink}>
          <Text style={styles.bottomLinkGray}>Don't have an account?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.bottomLinkBlue}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SIGN UP SCREEN
// ════════════════════════════════════════════════════════════════════════════
export function SignUpScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      <View style={styles.blobTL} /><View style={styles.blobBR} />

      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}
        keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={[styles.pageTitle, { marginTop: 16 }]}>Sign up</Text>

        <InputField icon="👤" placeholder="Full name" value={name} onChangeText={setName} />
        <InputField icon="✉️" placeholder="abc@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <InputField icon="🔒" placeholder="Your password" value={password} onChangeText={setPassword}
          secureTextEntry={!showPass} rightIcon={showPass ? '👁' : '🙈'} onRightIconPress={() => setShowPass(!showPass)} />
        <InputField icon="🔒" placeholder="Confirm password" value={confirm} onChangeText={setConfirm}
          secureTextEntry={!showConfirm} rightIcon={showConfirm ? '👁' : '🙈'} onRightIconPress={() => setShowConfirm(!showConfirm)} />

        <PrimaryBtn title="SIGN UP" onPress={() => navigation.navigate('Verification')} />

        <SocialButtons />

        <View style={styles.bottomLink}>
          <Text style={styles.bottomLinkGray}>Already have an account?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.bottomLinkBlue}>Signin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// VERIFICATION SCREEN
// ════════════════════════════════════════════════════════════════════════════
export function VerificationScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState(['4', '4', '', '']);
  const [countdown, setCountdown] = useState(20);
  const inputs = React.useRef([]);

  React.useEffect(() => {
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      <View style={styles.blobTL} /><View style={styles.blobBR} />

      <View style={[styles.scroll, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={[styles.pageTitle, { marginTop: 16 }]}>Verification</Text>
        <Text style={styles.verifySubtitle}>
          We've send you the verification{'\n'}code on +1 2620 0323 7631
        </Text>

        {/* OTP boxes */}
        <View style={styles.otpRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={r => inputs.current[idx] = r}
              style={[styles.otpBox, digit ? styles.otpBoxFilled : idx === code.findIndex(d => !d) ? styles.otpBoxActive : {}]}
              value={digit}
              onChangeText={val => handleDigit(val.slice(-1), idx)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <PrimaryBtn title="CONTINUE" onPress={() => navigation.replace('MainTabs')} />

        <View style={styles.resendRow}>
          <Text style={styles.resendGray}>Re-send code in </Text>
          <Text style={styles.resendTimer}>
            {countdown > 0 ? `0:${countdown.toString().padStart(2, '0')}` : ''}
          </Text>
          {countdown === 0 && (
            <TouchableOpacity onPress={() => setCountdown(20)}>
              <Text style={styles.bottomLinkBlue}>Resend</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// RESET PASSWORD SCREEN
// ════════════════════════════════════════════════════════════════════════════
export function ResetPasswordScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      <View style={styles.blobTL} /><View style={styles.blobBR} />

      <View style={[styles.scroll, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={[styles.pageTitle, { marginTop: 16 }]}>Resset Password</Text>
        <Text style={styles.verifySubtitle}>
          Please enter your email address to{'\n'}request a password reset
        </Text>

        <InputField icon="✉️" placeholder="abc@email.com" value={email}
          onChangeText={setEmail} keyboardType="email-address" />

        <PrimaryBtn title="SEND" onPress={() => navigation.navigate('Verification')} />
      </View>
    </KeyboardAvoidingView>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// STYLES
// ════════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1, paddingHorizontal: 28 },
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
  logoArea: { alignItems: 'center', marginBottom: 24 },
  logoText: { fontSize: 26, fontWeight: '700', color: C.text, marginTop: 8, letterSpacing: -0.5 },
  pageTitle: { fontSize: 26, fontWeight: '700', color: C.text, marginBottom: 22 },
  backBtn: { width: 36, height: 36, justifyContent: 'center' },
  backArrow: { fontSize: 22, color: C.text, fontWeight: '600' },
  rememberRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 22, marginTop: 4,
  },
  rememberText: { fontSize: 13, color: C.text, fontWeight: '500' },
  forgotText: { fontSize: 13, color: C.textGray },
  bottomLink: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  bottomLinkGray: { fontSize: 13, color: C.textGray },
  bottomLinkBlue: { fontSize: 13, color: C.primary, fontWeight: '600' },

  // OTP
  verifySubtitle: { fontSize: 14, color: C.textGray, lineHeight: 22, marginBottom: 32 },
  otpRow: { flexDirection: 'row', gap: 14, marginBottom: 32, justifyContent: 'center' },
  otpBox: {
    width: 60, height: 60, borderRadius: 12,
    borderWidth: 1.5, borderColor: C.border,
    backgroundColor: C.white, fontSize: 24, fontWeight: '700', color: C.text,
    textAlign: 'center',
  },
  otpBoxFilled: { borderColor: C.text },
  otpBoxActive: { borderColor: C.primary, borderWidth: 2 },
  resendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18, alignItems: 'center' },
  resendGray: { fontSize: 13, color: C.textGray },
  resendTimer: { fontSize: 13, color: C.primary, fontWeight: '600' },
});

const shared = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: 12,
    borderWidth: 1, borderColor: C.border,
    paddingHorizontal: 14, paddingVertical: 14,
    marginBottom: 14,
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: C.text, padding: 0 },
  btn: {
    backgroundColor: C.primary, borderRadius: 14,
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
  orLine: { flex: 1, height: 1, backgroundColor: C.border },
  orText: { fontSize: 12, color: C.textGray, fontWeight: '600' },
  socialBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: 12,
    borderWidth: 1, borderColor: C.border,
    paddingVertical: 14, paddingHorizontal: 20, gap: 12,
  },
  socialBtnText: { fontSize: 14, fontWeight: '600', color: C.text },
  googleG: {
    width: 26, height: 26, borderRadius: 13,
    textAlign: 'center', lineHeight: 26,
    fontSize: 15, fontWeight: '800', color: '#EA4335',
    backgroundColor: '#FFF5F5',
    overflow: 'hidden',
  },
  fbIcon: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#1877F2', alignItems: 'center', justifyContent: 'center',
  },
});
