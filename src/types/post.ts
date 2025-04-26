export interface Post {
    id: number;
    username: string;
    created_datetime: string;
    title: string;
    content: string;
  }
  
  export interface CreatePost {
    username: string;
    title: string;
    content: string;
  }