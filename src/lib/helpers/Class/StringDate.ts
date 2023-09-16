import moment from "moment";
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import 'moment/locale/ja';

class StringDate {
   private readonly date: string | undefined;
   private readonly formatDate: string;
   private readonly language: string;

   constructor(dateString: string, lang: string) {
      const dateValue = Date.parse(dateString);

      if (isNaN(dateValue)) {
         throw new Error("Invalid date string");
      }

      if (lang === "en") {
         lang = 'en-gb'
      }

      this.language = lang; 

      moment.locale(this.language);

      this.date = moment().format('ddd, LL');
      this.formatDate = moment(dateValue).format('L');
   }

   public get fullDate() {
      return this.date;
   }

   public get normalDate() {
      return this.formatDate;
   }

   public set newDateLL(date: Date) {
      moment(date).format('LL');
   };
}

export default StringDate;