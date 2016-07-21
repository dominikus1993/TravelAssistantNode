export const mongoDbUrl = "mongodb://localhost/travelAssistant";
export const secret = "123456789";

export const errorConfig = {
  configurable: true,
  value: function() {
    let alt = {};
    let storeKey = (key) => {
      alt[key] = this[key];
    };
    Object.getOwnPropertyNames(this).forEach(storeKey, this);
    return alt;
  }
};