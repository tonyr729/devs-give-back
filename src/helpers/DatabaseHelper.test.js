import firebase from '../firebase/firebase';
import DatabaseHelper from './DatabaseHelper';
import { listenerCount } from 'cluster';
jest.mock('../firebase/firebase.js');

describe('Database Helper', () => {
  describe('git hub login', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call firebase github auth', () => {
      database.gitHubLogin();

      expect(firebase.auth.GithubAuthProvider).toHaveBeenCalled();
    });

    it('should return an object', async () => {
      const expected = { user: 'tony', token: 123 };

      const actual = await database.gitHubLogin();

      expect(actual).toEqual(expected);
    });
  });

  describe('google login', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call firebase google auth', () => {
      database.googleLogin();

      expect(firebase.auth.GoogleAuthProvider).toHaveBeenCalled();
    });

    it('should return an object', async () => {
      const expected = 'tony';

      const actual = await database.googleLogin();

      expect(actual).toEqual(expected);
    });
  });

  describe('find matching problem', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call firebase database refrence', () => {
      database.findMatchingProblem();

      expect(firebase.database().ref().once).toHaveBeenCalled();
    });

    it('should return an object given correct params', async () => {
      const expected = {"clientID": 12};
    
      const actual = await database.findMatchingProblem(12);

      expect(actual).toEqual(expected);
    });

    it('should return null if given incorrect params', async () => {
      const expected = null;

      const actual = await database.findMatchingProblem(11);

      expect(actual).toEqual(expected);
    });
  });

  describe('pull problems from database', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call firebase database refrence', () => {
      database.pullProblemsFromDatabase();

      expect(firebase.database().ref().once).toHaveBeenCalled();
    });

    it('should return an object given the correct params', async () => {
      const expected = {
        problem: {clientID: 12},
        projects: {
          1: {projectID: 12}
        }
      };

      const actual = await database.pullProblemsFromDatabase();

      expect(actual).toEqual(expected);
    });
  });

  describe('pull categories from database', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call firebase database refrence', () => {
      database.pullCategoriesFromDatabase();

      expect(firebase.database().ref().once).toHaveBeenCalled();
    });

    it('should return an object given the correct params', async () => {
      const expected = {
        problem: {clientID: 12},
        projects: {
          1: {projectID: 12}
        }
      };

      const actual = await database.pullCategoriesFromDatabase();

      expect(actual).toEqual(expected);
    });
  });

  describe('pull projects from database', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call firebase database refrence', () => {
      database.pullProjectsFromDatabase();

      expect(firebase.database().ref().once).toHaveBeenCalled();
    });

    it('should return an object given the correct params', async () => {
      const expected = {
        problem: {clientID: 12},
        projects: {
          1: {projectID: 12}
        }
      };

      const actual = await database.pullProjectsFromDatabase();

      expect(actual).toEqual([expected]);
    });

    it('should call matchProjects', async () => {
      database.matchProjects = jest.fn();

      const actual = await database.pullProjectsFromDatabase();

      expect(database.matchProjects).toHaveBeenCalled();
    });
  });

  describe('match projects', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should return an array of objects if given correct params', async () => {
      const mockData = {
        1: {projectID: 12}
      };

      const expected = {
        problem: {clientID: 12},
        projects: {
          1: {projectID: 12}
        }
      };

      const actual = await database.matchProjects(mockData);

      expect(actual).toEqual([expected]);
    });
  });

  describe('write client to database', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call set method of firebase', () => {
      const mockClient = {id: 14};

      database.writeClientToDatabase(mockClient);

      const mockSet = firebase.database().ref().set;
      
      expect(mockSet).toHaveBeenCalled();
    });
  });

  describe('write dev to database', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call set method of firebase', () => {
      const mockDev = {id: 14};

      database.writeDevToDatabase(mockDev);

      const mockSet = firebase.database().ref().set;
      
      expect(mockSet).toHaveBeenCalled();
    });
  });

  describe('write dev project to database', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call push method of firebase', () => {
      database.writeDevProjectToDatabase(14, 14);

      const mockPush = firebase.database().ref().push;
      
      expect(mockPush).toHaveBeenCalled();
    });
  });

  describe('write problem to database', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call set method of firebase', () => {
      database.writeProblemToDatabase("title", "body", "categories", "clientID");

      const mockSet = firebase.database().ref().set;
        
      expect(mockSet).toHaveBeenCalled();
    });
  });

  describe('write contributer to database', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call set method of firebase', () => {
      database.writeContributerToDatabase("repo", "contact", "devName", "devID", "clientID");

      const mockSet = firebase.database().ref().set;
        
      expect(mockSet).toHaveBeenCalled();
    });
  });

  describe('write categories to database', () => {
    let database;

    beforeEach(() => {
      database = new DatabaseHelper();
    });

    it('should call set method of firebase', () => {
      database.setCategoriesInDatabase("categories");

      const mockSet = firebase.database().ref().set;
        
      expect(mockSet).toHaveBeenCalled();
    });
  });
});