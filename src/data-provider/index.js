import localStorageDataProvider from "ra-data-local-storage";

const defaultData = {
  bikes: [
    {
      id: 1,
      model: "bmx",
      color: "#FFFF00",
      location: "city-center",
      rating: "4.00",
      ratingSource: [
        {
          userId: 2,
          value: 4,
        },
        {
          userId: 3,
          value: 4,
        },
      ],
      isAvailable: true,
      reservations: [
        {
          userId: 1,
          start: "2021-10-01",
          end: "2021-10-10",
        },
        {
          userId: 2,
          start: "2021-10-12",
          end: "2021-10-15",
        },
      ],
    },
    {
      id: 2,
      model: "vitus",
      color: "#90EE90",
      location: "island",
      rating: "4.50",
      ratingSource: [
        {
          userId: 2,
          value: 4,
        },
        {
          userId: 3,
          value: 5,
        },
      ],
      isAvailable: true,
      reservations: [],
    },
    {
      id: 3,
      model: "hutch",
      color: "#FFC0CB",
      location: "coast",
      rating: "",
      ratingSource: [],
      isAvailable: true,
      reservations: [],
    },
    {
      id: 4,
      model: "yeti",
      color: "#ADD8E6",
      location: "park",
      rating: "5.00",
      ratingSource: [
        {
          userId: 2,
          value: 5,
        },
        {
          userId: 3,
          value: 5,
        },
      ],
      isAvailable: false,
      reservations: [],
    },
    {
      id: 5,
      model: "kona",
      color: "#FF0000",
      location: "beach",
      rating: "",
      ratingSource: [],
      isAvailable: true,
      reservations: [],
    },
  ],
  users: [
    {
      id: 1,
      role: "manager",
      username: "admin",
      password: "21232f297a57a5a743894a0e4a801fc3",
    },
    {
      id: 2,
      role: "user",
      username: "user1",
      password: "24c9e15e52afc47c225b757e7bee1f9d",
    },
    {
      id: 3,
      role: "user",
      username: "user2",
      password: "7e58d63b60197ceb55a1c487989a3720",
    },
  ],
};

export const dataProvider = localStorageDataProvider({
  defaultData,
});
