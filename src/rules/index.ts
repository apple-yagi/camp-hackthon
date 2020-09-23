export const usernameRules = [
  (v: string) => !!v || 'ユーザー名は必須項目です',
  (v: string) =>
    (v && v.length >= 6) || 'ユーザー名は6文字以上入力してください',
];

export const passwordRules = [
  (v: string) => !!v || 'パスワードは必須項目です',
  (v: string) =>
    (v && v.length >= 6) || 'パスワードは6文字以上入力してください',
];

export const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];
