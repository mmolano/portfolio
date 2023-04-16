import moment from "moment";
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import 'moment/locale/ja';

class StringDate {
   private readonly date: string;
   private readonly language: string | undefined = localStorage.getItem('lang')?.toString();

   constructor(dateString: string) {
      const dateValue = Date.parse(dateString);

      if (isNaN(dateValue)) {
         throw new Error("Invalid date string");
      }

      moment.locale(this.language !== null ? this.language : 'en-gb');

      this.date = moment(dateValue).format('ddd, LL');
   }

   public get fullDate() {
      return this.date;
   }

   public set newDateLL(date: Date) {
      moment(date).format('LL');
   };
}

export default StringDate;