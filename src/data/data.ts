import { DataModel } from "../interfaces/FileManagerModels";

export const initialData: DataModel[] = [
  {
    name: "Pictures.jpg",
    size: 0,
    dateCreated: new Date(),
    dateModified: new Date(),
    items: []
  },{
    name: "Documents",
    size: 100000,
    dateCreated: new Date(),
    dateModified: new Date(),
    items: [
      {
        name: "Image.jpg",
        size: 200,
        dateCreated: new Date(),
        dateModified: null
      },
      {
        name: "shared",
        size: 202665,
        dateCreated: new Date(),
        dateModified: null,
        items: [
          {
            name: "wave.jpg",
            size: 20,
            dateCreated: new Date(),
            dateModified: null
          },
          {
            name: "wave",
            size: 20,
            dateCreated: new Date(),
            dateModified: null
          }
        ],
      },
      {
        name: "Anime.jpg",
        size: 50,
        dateCreated: new Date(),
        dateModified: null
      }
    ]      
  }, {
    name: "Pictures",
    size: 0,
    dateCreated: new Date(),
    dateModified: new Date(),
    items: []
  }, {
    name: "Music",
    size: 0,
    dateCreated: new Date(),
    dateModified: new Date(),
    items: []
  }
];
