interface IComment {
  _id?: string;
  email: string;
  name: string;
  text: string;
  eventId?: string;
}

export default IComment;
