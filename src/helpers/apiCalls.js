import firebase from '../firebase/firebase';


export const gitHubLogin = async () => {
  const provider = new firebase.auth.GithubAuthProvider()
  provider.addScope('public_repo');
  const response = await firebase.auth().signInWithPopup(provider);
  const token = response.credential.accessToken;
  const user = response.user;
  return {user, token}
}

export const googleLogin = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const response = await firebase.auth().signInWithPopup(provider);
  return response.user;
}


export const findMatchingProblem = async (userID) => {
  const response = await firebase.database().ref('/Problems/').once('value');
  let problem = null;
  if (response.val()) {
    const problems = response.val();
    const matchingID = Object.keys(problems).find(problem => problems[problem].clientID === userID)
    problem = problems[matchingID];
  }
  return problem;
}