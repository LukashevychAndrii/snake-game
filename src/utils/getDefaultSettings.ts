interface DefaultSettingsI {
  boardSize__DEFAULT: 400;
  boardColor__DEFAULT: "#0e0e10";
  boardFoodColor__DEFAULT: "#bd2916";
  boardSnakeColor__DEFAULT: "#44db5d";
  boardSnakeSpeed__DEFAULT: 50;
}

const DefaultSettings: DefaultSettingsI = {
  boardSize__DEFAULT: 400,
  boardColor__DEFAULT: "#0e0e10",
  boardFoodColor__DEFAULT: "#bd2916",
  boardSnakeColor__DEFAULT: "#44db5d",
  boardSnakeSpeed__DEFAULT: 50,
};

const getDefaultSettings = () => {
  return DefaultSettings;
};

export default getDefaultSettings;
