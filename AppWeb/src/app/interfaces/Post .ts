interface Reaction {
  like: number;
  love: number;
  party: number;
}
interface CommunityComment {
  author: string;
  text: string;
  date: string;
}

interface Post {
  id: string;
  title: string;
  author: string;
  photoUrl: string;
  date: string;
  reactions: Reaction;
  comments: CommunityComment[];
}