export const isDevelopment = () => {
  if (window?.location?.hostname === 'localhost') {
    return true;
  }

  // TODO: Change to false when CORS issue get solved
  return true;
}
