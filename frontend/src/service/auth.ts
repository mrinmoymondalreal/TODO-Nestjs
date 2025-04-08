export function saveAuth(token: string) {
  localStorage.setItem("token", token);
}
