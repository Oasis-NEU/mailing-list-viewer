export type BgColor = "green" | "yellow" | "blue" | "orange"

export const nextColor = (color: BgColor): BgColor => {
   switch (color) {
     case "green":
       return "yellow";
     case "yellow":
       return "blue";
     case "blue":
       return "orange";
     case "orange":
       return "green";
   }
 };