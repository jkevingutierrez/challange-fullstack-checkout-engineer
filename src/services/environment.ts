export const isDevelopment = () => {
  if (window?.location?.hostname === 'localhost') {
    return true;
  }

  return false;
}
