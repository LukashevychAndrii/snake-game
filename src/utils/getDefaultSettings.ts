interface DefaultSettingsI {
  boardColor__DEFAULT: "#0e0e10";
  boardFoodColor__DEFAULT: "#bd2916";
  boardSize__DEFAULT: 400;
  boardSnakeColor__DEFAULT: "#44db5d";
  boardSnakeSpeed__DEFAULT: 50;
}

const DefaultSettings: DefaultSettingsI = {
  boardColor__DEFAULT: "#0e0e10",
  boardFoodColor__DEFAULT: "#bd2916",
  boardSize__DEFAULT: 400,
  boardSnakeColor__DEFAULT: "#44db5d",
  boardSnakeSpeed__DEFAULT: 50,
};

const getDefaultSettings = () => {
  return DefaultSettings;
};

export default getDefaultSettings;
