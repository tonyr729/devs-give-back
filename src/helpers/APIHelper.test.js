import APIHelper from './APIHelper';


describe('APIHelper', () => {
  describe('fetch number of hours', () => {
    let api;
    let response;
    let url = "https://api.github.com/repos/tonyr729/movie-tracker";

    beforeEach(() => {
      api = new APIHelper();
      response = [
        [
          0,
          0,
          1
        ],
        [
          0,
          1,
          0
        ]
      ];

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(response)
      }));
    });
  
    it('fetch is called with the correct params', async () => {
      const expected = "https://api.github.com/repos/tonyr729/movie-tracker/stats/punch_card";
  
      await api.fetchNumberOfHours(url);

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('returns a number if the promise resolves', async () => {
      
      await expect(api.fetchNumberOfHours()).resolves.toEqual(1);
    });
  
    it('throws an error if status code is not ok', async () => {
      const error = 'Failed to fetch data';
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.reject(Error(error)));
  
      await expect(api.fetchNumberOfHours())
        .rejects.toEqual(Error('Failed to fetch data'));
    });
  });

  describe('fetch number of updates', () => {
    let api;
    let response;
    let url = "https://api.github.com/repos/tonyr729/movie-tracker";

    beforeEach(() => {
      api = new APIHelper();
      response = [
        { 
          total: 1
        },
        { 
          total: 1
        }
      ];

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(response)
      }));
    });
  
    it('fetch is called with the correct params', async () => {
      const expected = "https://api.github.com/repos/tonyr729/movie-tracker/stats/commit_activity";
  
      await api.fetchNumberOfUpdates(url);

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('returns a number if the promise resolves', async () => {
      
      await expect(api.fetchNumberOfUpdates()).resolves.toEqual(2);
    });
  
    it('throws an error if status code is not ok', async () => {
      const error = 'Failed to fetch data';
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.reject(Error(error)));
  
      await expect(api.fetchNumberOfUpdates())
        .rejects.toEqual(Error('Failed to fetch data'));
    });
  });

  describe('fetch number of contributers', () => {
    let api;
    let response;
    let url = "https://api.github.com/repos/tonyr729/movie-tracker";

    beforeEach(() => {
      api = new APIHelper();
      response = [
        { 
          author: "tony"
        },
        { 
          author: "someone else"
        }
      ];

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(response)
      }));
    });
  
    it('fetch is called with the correct params', async () => {
      const expected = "https://api.github.com/repos/tonyr729/movie-tracker/stats/contributors";
  
      await api.fetchNumberOfContributers(url);

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('returns a number if the promise resolves', async () => {
      
      await expect(api.fetchNumberOfContributers()).resolves.toEqual(2);
    });
  
    it('throws an error if status code is not ok', async () => {
      const error = 'Failed to fetch data';
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.reject(Error(error)));
  
      await expect(api.fetchNumberOfContributers())
        .rejects.toEqual(Error('Failed to fetch data'));
    });
  });

  describe('fetch lines of code', () => {
    let api;
    let response;
    let url = "https://api.github.com/repos/tonyr729/movie-tracker";

    beforeEach(() => {
      api = new APIHelper();
      response = [
        [
          23452626,
          1,
          2
        ],
        [
          234234,
          1,
          2
        ]
      ];

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(response)
      }));
    });
  
    it('fetch is called with the correct params', async () => {
      const expected = "https://api.github.com/repos/tonyr729/movie-tracker/stats/code_frequency";
  
      await api.fetchLinesOfCode(url);

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('returns a number if the promise resolves', async () => {
      
      await expect(api.fetchLinesOfCode()).resolves.toEqual(2);
    });
  
    it('throws an error if status code is not ok', async () => {
      const error = 'Failed to fetch data';
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.reject(Error(error)));
  
      await expect(api.fetchLinesOfCode())
        .rejects.toEqual(Error('Failed to fetch data'));
    });
  });
});