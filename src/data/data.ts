import { DataModel } from "../App";

export const initialData: DataModel[] = [
  {
    name: "Tom",
    size: 0,
    dateCreated: new Date(),
    dateModified: new Date(),
    items: [
        {
          name: "Image.jpg",
          size: 20,
          dateCreated: new Date(),
          dateModified: null
        },
        {
          name: "Image2.jpg",
          size: 20,
          dateCreated: new Date(),
          dateModified: null,
          items: [
            {
              name: "Nested",
              size: 20,
              dateCreated: new Date(),
              dateModified: null
            }
          ],
        }
    ]      
  }, {
    name: "Jerry",
    size: 0,
    dateCreated: new Date(),
    dateModified: new Date(),
    items: []
  }
];
