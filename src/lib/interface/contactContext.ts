export interface ErrorContactIF {
   id: string | number,
   message: string,
}

export type FormIF = {
   name: string,
   subject: string,
   message: string,
   mail: string,
   errors?: ErrorContactIF[],
}

type Action = {
   type: 'modify-name' | 'modify-subject' | 'modify-message' | 'modify-mail' | 'set-error' | 'reset-all';
   value: any;
   which?: string;
};

export type ContactContext = {
   inputs: FormIF,
   dispatch: (action: Action) => void;
}