import React from 'react'
import './User.css'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


export default function User(props) {
    return <Card className="d-flex card">
            <CardContent className="d-flex">
                <Avatar alt={props.username} src={props.img} />
                <p className="username">{props.username}</p>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() => {
                    props.handleFollowClick(props.username)
                }}>Follow</Button>
            </CardActions>
        </Card>
}