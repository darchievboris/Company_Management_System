export default clients => {
  const now = new Date();

  const filteredClients = clients.filter(client => Date.parse(client.start) > now);

  return filteredClients.sort((a, b) => {
    const one = Date.parse(a.start);
    const two = Date.parse(b.start);
    if (one < two) {
      return -1;
    }
    if (one > two) {
      return 1;
    }
    return 0;
  });
};
