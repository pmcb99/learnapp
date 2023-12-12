

export function isWarningInString (string: string) {
  return string.includes("!WARNING!");
}

export function removeWarningFromString (string: string) {
  return string.replaceAll("!WARNING!", "");
}