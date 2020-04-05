import { FunctionComponent, useContext, useState, ChangeEvent, FormEvent } from "react";
import UserContext from "../context/UserContext";
import { Form, FormGroup, Input, FormFeedback, Button, CardHeader } from "reactstrap";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCode, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './VoteInput.module.css';
import User from "../../business/entities/User";
import Post from "../../business/entities/Post";
import Vote from "../../business/entities/Vote";

const VoteInput: FunctionComponent<{ post: Post, user: User, handleSuccess: (vote: Vote) => void }> = ({ handleSuccess }) => {
    const { token, profile, setErrors } = useContext(UserContext);
    const [vote, setVote] = useState('');
    const [invalid, setInvalid] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!invalid) {
            //@ts-ignore
            const vote = { user: user, post: post }
            fetch(`/api/votes`, {
                method: 'POST',
                headers: {
                    authorization: token
                },
                body: JSON.stringify(vote)
            }).then(async response => {
                return response.json();
            }).then(c => {
                handleSuccess(c);
            }).catch(e => setErrors(e))
        }
    }

    return (
        <CardHeader>
            <Button color="secondary" className={styles.voteButton} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            <span>{vote}</span>
            <Button color="secondary" className={styles.voteButton}>
                <FontAwesomeIcon icon={faArrowDown} />
            </Button>
        </CardHeader>

        )
}

export default VoteInput;