class DataCleaner {

  cleanClientLogin =(client) => ({
    id: client.uid,
    name: client.displayName,
    photoURL: client.photoURL,
    apiKey: client.apiKey
  });
}

export default DataCleaner;
