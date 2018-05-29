import firebase from '../firebase/firebase';

export const findMatchingProblem = async (userID) => {
  const response = await firebase.database().ref('/Problems/').once('value');
  if (response.val()) {
    console.log(response.val())
    const problems = response.val();
    const matchingID = Object.keys(problems).find(problem => problems[problem].clientID === userID)
    return problems[matchingID]
  }
}