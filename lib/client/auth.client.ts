// auth.client.ts
export function signOutTeacherClient() {
  document.cookie = "auth_token=; path=/; max-age=0; samesite=strict;";
  window.location.href = "/sign-in";
}

// auth.client.ts
export function setAuthCookie(token: string) {
  document.cookie = `auth_token=${token}; path=/; max-age=${
    60 * 60 * 24 * 7
  }; samesite=strict;`;
}
