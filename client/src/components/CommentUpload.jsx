import { Box, Button, Modal, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from 'utils';

const initialValuesComment = {
    comment: "",
};

const commentSchema = yup.object().shape({
    comment: yup.string().required("required")
});

const CommentUpload = ({ openComment, setOpenComment, handleCloseComment }) => {

    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const postId = localStorage.getItem('postId');
    const userId = localStorage.getItem('userId');

    const commentSave = async (values, onSubmitProps) => {
        try {
            const res = await axios.post(`${BASE_URL}/posts/${postId}/comment`, {
                postId,
                comment: values.comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            const savedComment = res.data; // Access response data using res.data

            console.log(savedComment);
            onSubmitProps.resetForm();
            handleCloseComment();
        } catch (error) {
            console.error("Error saving comment:", error);
            // Handle error as needed
        }
    }

    const handleCommentSubmit = async (values, onSubmitProps) => {
        await commentSave(values, onSubmitProps);
    };

    return (
        <Modal
            open={openComment}
            onClose={handleCloseComment}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Formik
                    onSubmit={handleCommentSubmit}
                    initialValues={initialValuesComment}
                    validationSchema={commentSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <Typography fontWeight="bold" fontSize="32px" color="primary" sx={{ textAlign: 'center' }}>Comment's here</Typography>

                                <TextField
                                    label="Comment"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.comment}
                                    name="comment"
                                    error={Boolean(touched.comment) && Boolean(errors.comment)}
                                    helperText={touched.comment && errors.comment}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <Button
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        m: "1rem 0 2rem",
                                        p: "1rem",
                                        textTransform: 'capitalize',
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main },
                                    }}
                                >
                                    Post Comment
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Modal>
    )
}

export default CommentUpload;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '20px',
    p: 4,
};
