export const BIKE_MODELS = {
  bmx: "bmx",
  hutch: "hutch",
  kona: "kona",
  vitus: "vitus",
  yeti: "yeti",
};

export const bikeModelLabels = {
  [BIKE_MODELS.bmx]: "BMX",
  [BIKE_MODELS.hutch]: "Hutch",
  [BIKE_MODELS.kona]: "Kona",
  [BIKE_MODELS.vitus]: "Vitus",
  [BIKE_MODELS.yeti]: "Yeti",
};

export const bikeModelChoices = Object.entries(bikeModelLabels).map(
  ([id, name]) => ({
    id,
    name,
  })
);

export const BIKE_COLORS = {
  red: "#FF0000",
  pink: "#FFC0CB",
  green: "#90EE90",
  blue: "#ADD8E6",
  yellow: "#FFFF00",
};

export const bikeColorLabels = {
  [BIKE_COLORS.red]: "Red",
  [BIKE_COLORS.pink]: "Pink",
  [BIKE_COLORS.green]: "Green",
  [BIKE_COLORS.blue]: "Blue",
  [BIKE_COLORS.yellow]: "Yellow",
};

export const bikeColorChoices = Object.entries(bikeColorLabels).map(
  ([id, name]) => ({
    id,
    name,
  })
);

export const BIKE_LOCATIONS = {
  cityCenter: "city-center",
  beach: "beach",
  island: "island",
  park: "park",
  coast: "coast",
};

export const bikeLocationLabels = {
  [BIKE_LOCATIONS.cityCenter]: "City center",
  [BIKE_LOCATIONS.beach]: "Beach",
  [BIKE_LOCATIONS.island]: "Island",
  [BIKE_LOCATIONS.park]: "Park",
  [BIKE_LOCATIONS.coast]: "Coast",
};

export const bikeLocationChoices = Object.entries(bikeLocationLabels).map(
  ([id, name]) => ({
    id,
    name,
  })
);

export const BIKE_RATINGS = [1, 2, 3, 4, 5];

export const bikeRatingChoices = BIKE_RATINGS.map((rate) => ({
  id: rate,
  name: rate.toString(),
}));
