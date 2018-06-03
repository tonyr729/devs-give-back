import firebase from '../firebase/firebase';
import { log } from 'util';

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

  
  pullProblemsFromDatabase = async () => {
    const response = await firebase.database().ref('/Problems/').once('value');
    let problems = null;
    if (response.val()) {
      problems = response.val();
    }
    return problems;
  }
  
  pullCategoriesFromDatabase = async () => {
    const response = await firebase.database().ref('/Categories/categories').once('value');
    let categories = null;
    if (response.val()) {
      categories = response.val();
    }
    return categories;
  }
  
  pullProjectsFromDatabase = async (devID) => {
    const response = await firebase.database().ref('/devs/' + devID).once('value');
    let projects = null;
    if (response.val()) {
      let dev = response.val();
      projects = await this.matchProjects(dev.projects);
    }
    return projects;
  }

  matchProjects = async (data) => {
    if (data) {
      const projects = Object.values(data);
      const matchingProblems = projects.map(async project => {
        const id = project.projectID;
        const response = await firebase.database().ref('/Problems/' + id).once('value');
        if (response.val()) {
          return response.val();
        }
      });
      return Promise.all(matchingProblems);
    }
  }

  writeClientToDatabase = (client) => {
    firebase.database().ref('/Clients/' + client.id).set({
      username: client.name,
      picture: client.photoURL
    });
  }

  writeDevToDatabase = (dev) => {
    firebase.database().ref('devs/' + dev.id + '/info').set({
      name: dev.name,
      photo: dev.photoURL,
      token: dev.token
    });
  }
  writeDevProjectToDatabase = (devID, projectID) => {
    firebase.database().ref('/devs/' + devID + '/projects').push({
      projectID
    });
  }
  //Pass in clientName and clientPicture in ProblemCategory.js
  writeProblemToDatabase = (title, body, categories, clientID) => {
    firebase.database().ref('/Problems/' + clientID).set({
      title,
      body,
      categories,
      clientID
    });
  }

  writeContributerToDatabase = (repo, contact, devName, devID, clientID) => {
    firebase.database().ref('/Problems/' + clientID  + '/dev').set({
      repo,
      contact,
      devName,
      devID
    });
  }

  setCategoriesInDatabase = (categories) => {
    firebase.database().ref('/Categories').set({
      categories
    })
  }

}

export default DatabaseHelper;