export const paths = {
  explore: () => '/',
  join: () => '/join',
  card: (cardId = ':cardId') => `/card/${cardId}`,
};
