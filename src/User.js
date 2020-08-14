import React from 'react'
import './User.css'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


export default function User(props) {
    return <div>
        <Card color="primary.main" className="d-flex">
            <CardContent>
                <Avatar alt={props.username} src={props.img} />
                {props.username}
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() => {
                    props.handleFollowClick(props.username)
                }}>Follow</Button>
            </CardActions>
        </Card>
    </div>
}