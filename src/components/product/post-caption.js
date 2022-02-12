import { Form, FloatingLabel } from 'react-bootstrap';
const PostCaption = (props) => {
    console.log(props.caption);
    return (
        <>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                />
            </FloatingLabel>
        </>
    )
}
export default PostCaption;