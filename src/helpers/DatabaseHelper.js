import firebase from '../firebase/firebase';

class DatabaseHelper {

  gitHubLogin = async () => {
    const provider = new firebase.auth.GithubAuthProvider()
    provider.addScope('public_repo');
    const response = await firebase.auth().signInWithPopup(provider);
    const token = response.credential.accessToken;
    const user = response.user;
    return {user, token}
  }
  
  googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await firebase.auth().signInWithPopup(provider);
    return response.user;
  }
  
  
  findMatchingProblem = async (userID) => {
    const response = await firebase.database().ref('/Problems').once('value');
    let problem = null;
    if (response.val()) {
      const problems = response.val();
      const matchingID = Object.keys(problems).find(problem => problems[problem].clientID === userID)
      problem = problems[matchingID];
    }
    return problem;
  }

  pullCategoriesFromDatabase = async () => {
    const response = await firebase.database().ref('/Categories/categories').once('value');
    let categories = null;
    if (response.val()) {
      categories = response.val();
    }
    return categories;
  }

  writeClientToDatabase = (client) => {
    firebase.database().ref('/Clients/' + client.id).set({
      username: client.name,
      picture: client.photoURL
    });
  }

  writeProblemToDatabase = (title, body, categories, clientID) => {
    firebase.database().ref('/Problems/' + clientID).set({
      title,
      body,
      categories,
      clientID
    });
  }

  setCategoriesInDatabase = (categories) => {
    firebase.database().ref('/Categories').set({
      categories
    })
  }

}

export default DatabaseHelper;