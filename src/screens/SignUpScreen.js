import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
  StatusBar, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthBackground, BackButton, InputField, PrimaryBtn, SocialButtons, C } from '../components/AuthComponents';

export default function SignUpScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      <AuthBackground />

      <ScrollView
        contentContainerStyle={[styles.scroll, {
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 24,
        }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        <BackButton onPress={() => navigation.goBack()} />

        <Text style={styles.pageTitle}>Sign up</Text>

        <InputField
          icon="👤"
          placeholder="Full name"
          value={name}
          onChangeText={setName}
        />
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
        <InputField
          icon="🔒"
          placeholder="Confirm password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry={!showConfirm}
          rightIcon={showConfirm ? '👁' : '🙈'}
          onRightIconPress={() => setShowConfirm(!showConfirm)}
        />

        <PrimaryBtn title="SIGN UP" onPress={() => navigation.navigate('Verification')} />

        <SocialButtons />

        <View style={styles.bottomLink}>
          <Text style={styles.bottomGray}>Already have an account?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.bottomBlue}>Signin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 28 },
  pageTitle: { fontSize: 26, fontWeight: '700', color: C.text, marginBottom: 22, marginTop: 16 },
  bottomLink: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  bottomGray: { fontSize: 13, color: C.textGray },
  bottomBlue: { fontSize: 13, color: C.primary, fontWeight: '600' },
});
