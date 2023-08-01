export interface CommentBaseDto {
    id: string;
    text: string;
    user: string;
    password: string;
    creationDate: Date;
    modificationDate: Date;
    isAdmin: boolean;
    isDeleted: boolean;
    reactions: string[];
}

export interface CommentPostDto {
    text: string;
    user: string;
    password: string;
    pageKey: string;
    parentId?: string;
    repliedTo?: string;
}

export interface CommentEditDto {
    text: string;
    id: string;
    password: string;
}

export interface CommentDeleteDto {
    id: string;
    password: string;
}

export interface CommentDto extends CommentBaseDto {
    children: ChildCommentDto[];
}

export interface ChildCommentDto extends CommentBaseDto {
    repliedTo?: string;
}
