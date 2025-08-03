export const getSettingsQuery = () => {
  return fetch(`${process.env.API_URL}/api/settings`);
};
