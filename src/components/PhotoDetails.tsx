import { Box, Button } from "@mui/material";
import { useState } from "react";
import { CloseIcon } from "../assets/CloseIcon";
import { useAddCommentToPhotoMutation, useDeleteCommentMutation, useGetPhotoCommentsQuery } from "../redux/slices/commentsApi";
import { ImageType } from "../redux/slices/types";

export const PhotoDetails = ({ userId, image, onClose }: { userId: number, image: ImageType, onClose: () => void }): JSX.Element => {
    const { data: comments, refetch: refetchComments } = useGetPhotoCommentsQuery({ photoId: image.id });
    const [addCommentToPhoto] = useAddCommentToPhotoMutation();
    const [deleteCommentPhoto] = useDeleteCommentMutation();
    const [comment, setComment] = useState('');

    const nextCommentId = comments?.length ? image.id * 1000 + comments[comments.length - 1].id + 1 : image.id * 1000 + 1;

    const addComment = () => {
        if(comment) {
            addCommentToPhoto({ photoId: image.id, comment: { id: nextCommentId, text: comment, userId: userId, photoId: image.id } });
            refetchComments();
            setComment('');
        }
    };

    const deleteComment = (commentId: number) => {
        deleteCommentPhoto(commentId);
        refetchComments();
    };

    return (
        <Box 
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{width: '90%' }}>
                <Button style={{ float: 'right' }} onClick={onClose}>
                    <CloseIcon />
                </Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', maxWidth: '90%', maxHeight: '80%', justifyContent: 'center'}}>
                <img
                    src={image.img}
                    alt="Full size"
                    style={{ maxWidth: '90%', maxHeight: '90%', justifyContent: 'center' }}
                />
                <Box sx={{ maxWidth: '90%', maxHeight: '90%', justifyContent: 'space-between', backgroundColor: 'white', opacity: 0.8, pl: 2, pr:2}}>
                    {comments?.map(comment => (
                        <Box sx={{ dispaly: 'flex', maxWidth: '250px', justifyContent: 'space-between', pt: 2}} key={comment.id}>
                            <span style={{padding: '3px'}}>{comment.text}</span>
                            {
                            userId === comment.userId && 
                            <Button sx={{height: 30}} onClick={() => deleteComment(comment.id)}>
                                Delete
                            </Button>
                            }
                        </Box>
                    ))}
                    <Box sx={{ justifyContent: 'center', backgroundColor: 'white', opacity: 0.8, pt: 2 }}>
                        <textarea 
                            style={{
                                minWidth: '100%',
                                maxWidth: '100%',
                                resize: 'none'
                            }}
                            placeholder="Write your comment here"
                            value={comment}
                            onChange={
                                (event) => setComment(event.target.value)
                            }
                        >
                        </textarea>
                        <Box sx={{display: 'flex', width: '200px'}}>
                            <Button variant="contained" style={{ width: '200px' }} onClick={() => addComment()}>
                                Write
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
