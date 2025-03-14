module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Para evitar errores con archivos CSS
    },
  };
  