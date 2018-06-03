class DataCleaner {

  cleanClientLogin =(client) => ({
    id: client.uid,
    name: client.displayName,
    photoURL: client.photoURL,
    apiKey: client.apiKey
  });

  cleanDevLogin =(dev, token) => ({
    id: dev.uid,
    name: dev.displayName,
    photoURL: dev.photoURL,
    token: token
  });

  cleanError = (error) => ({
    code: error.code,
    message: error.message,
    email: error.email,
    credential: error.credential
  })

  cleanRepoURL = (repoURL) => {
    const repoInfo = repoURL.split('/');
    const devID = repoInfo[3];
    const projectName = repoInfo[4];
    const apiURL = `https://api.github.com/repos/${devID}/${projectName}`;
    return apiURL;
  }

}

export default DataCleaner;
