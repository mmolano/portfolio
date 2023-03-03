import sanitizeHtml from 'sanitize-html';

export default function cleanedMessage(type: any) {
   return sanitizeHtml(type, {
      allowedTags: [],
      allowedAttributes: {},
      allowedSchemes: [],
      disallowedTagsMode: 'discard'
   });
};