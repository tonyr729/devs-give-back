import firebase from '../firebase/firebase';

export const findMatchingProblem = async (userID) => {
  const response = await firebase.database().ref('/Problems/').once('value');
  let problem = null;
  if (response.val()) {
    console.log(response.val())
    console.log(userID)
    const problems = response.val();
    const matchingID = Object.keys(problems).find(problem => problems[problem].clientID === userID)
    problem = problems[matchingID];
    console.log(problem)
  }
  return problem;
}