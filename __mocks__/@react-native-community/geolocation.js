module.exports = {
  getCurrentPosition: jest.fn((success) =>
    success({
      coords: { latitude: 37.386052, longitude: -122.083851, accuracy: 5 },
      timestamp: Date.now(),
    }),
  ),
  requestAuthorization: jest.fn(),
  watchPosition: jest.fn(() => 1),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
  setRNConfiguration: jest.fn(),
};
