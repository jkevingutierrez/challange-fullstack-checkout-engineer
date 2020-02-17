export const isDevelopment = () => {
  if (window?.location?.host === 'localhost') {
    return true;
  }

  return false;
}
