
const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class EmailAddress {
   private readonly email: string;

   constructor(email: string) {
      if (!regex.test(email)) {
         throw new Error(`Invalid email address`);
      }

      this.email = email;
   }

   public get emailValue(): string {
      return this.email;
   }
}

export default EmailAddress;