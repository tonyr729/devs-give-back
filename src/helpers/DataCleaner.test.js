import DataCleaner from './DataCleaner';

describe('DataCleaner', () => {
  describe('clean client login', () => {
    let cleaner;

    beforeEach(() => {
      cleaner = new DataCleaner();
    })

    it('should return clean client login info', () => {
      const mockClient = {
        uid: 1,
        displayName: 'tony',
        photoURL: 'photo',
        apiKey: 1,
        shouldBeRemovedKey: 'value'
      };
      const expected = {
        apiKey: 1, 
        id: 1, 
        name: 'tony', 
        photoURL: 'photo'
      }

      const actual = cleaner.cleanClientLogin(mockClient);

      expect(actual).toEqual(expected);
    });
  });

  describe('clean Dev login', () => {
    let cleaner;

    beforeEach(() => {
      cleaner = new DataCleaner();
    })

    it('should return clean Dev login info', () => {
      const mockDev = {
        uid: 1,
        displayName: 'tony',
        photoURL: 'photo',
        shouldBeRemovedKey: 'value'
      };
      const expected = {
        id: 1, 
        name: 'tony', 
        photoURL: 'photo', 
        token: 'token'
      }

      const actual = cleaner.cleanDevLogin(mockDev, 'token');

      expect(actual).toEqual(expected);
    });
  });

  describe('clean Error', () => {
    let cleaner;

    beforeEach(() => {
      cleaner = new DataCleaner();
    })

    it('should return clean Error info', () => {
      const mockError = {
        code: 500,
        message: 'whaddup',
        email: 'ton@msf.com',
        credential: 'cred',
        shouldBeRemovedKey: 'value'
      };
      const expected = {
        code: 500, 
        credential: "cred", 
        email: "ton@msf.com", 
        message: "whaddup"
      }

      const actual = cleaner.cleanError(mockError);

      expect(actual).toEqual(expected);
    });
  });

  describe('clean Repo url', () => {
    let cleaner;

    beforeEach(() => {
      cleaner = new DataCleaner();
    })

    it('should return clean Repo url', () => {
      const mockRepo = "https://github.com/tonyr729/movie-tracker";

      const expected = "https://api.github.com/repos/tonyr729/movie-tracker";

      const actual = cleaner.cleanRepoURL(mockRepo);

      expect(actual).toEqual(expected);
    });
  });
});