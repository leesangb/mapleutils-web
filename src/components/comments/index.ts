export interface CommentBase {
    id: string;
    text: string;
    user: string;
    password: string;
    creationDate: Date;
    modificationDate: Date;
    isAdmin: boolean;
    isDeleted: boolean;
}

export interface CommentPost {
    text: string;
    user: string;
    password: string;
    pageKey: string;
    parentId?: string;
    repliedTo?: string;
}

export interface CommentEdit {
    text: string;
    id: string;
    password: string;
}

export interface CommentDelete {
    id: string;
    password: string;
}

export interface Comment extends CommentBase {
    children: ChildComment[];
}

export interface ChildComment extends CommentBase {
    repliedTo?: string;
}
